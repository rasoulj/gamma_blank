import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {VStack} from 'native-base';
import React, {memo, useImperativeHandle, useState} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  VideoPlayIconSet,
  deviceHeight,
  deviceWidth,
} from '~/components/elemental';
import Selector from './Selector';
import RNFS from 'react-native-fs';

const GalleryItem = React.forwardRef(
  (
    {
      item,
      index,
      selectedItems,
      imageRef,
      preItemIndexRef,
      elRefs,
      enableMultiSelect = false,
    }: {
      item: PhotoIdentifier;
      index: number;
      selectedItems?: any;
      imageRef: any;
      preItemIndexRef: any;
      elRefs: any;
      enableMultiSelect?: boolean;
    },
    ref,
  ) => {
    const [selectNumber, setSelectNumber] = useState(0);
    const [isSelected, setIsSelected] = useState(false);

    const getAbsoluteIosPath = async item => {
      const path = item?.node?.image?.uri;
      let uri = path;
      if (path.includes('ph://')) {
        let id = path.replace('ph://', '');
        id = id.substring(0, id.indexOf('/'));
        let ext = item?.node?.image?.extension;
        uri = `assets-library://asset/asset.${ext}?id=${id}&ext=${ext}`;
        const encodedUri = encodeURI(uri);
        const destPath = `${
          RNFS.CachesDirectoryPath
        }/${new Date().toISOString()}.${ext}`;
        if (item?.node?.type === 'video')
          await RNFS.copyAssetsVideoIOS(encodedUri, destPath);
        else {
          await RNFS.copyAssetsFileIOS(encodedUri, destPath, 1080, 1080);
        }
        uri = destPath;
      }
      return uri;
    };

    const onCheckboxPressed = async () => {
      let tempItems = [...selectedItems?.current];
      let uri = await getAbsoluteIosPath(item);
      let findIndex = tempItems?.findIndex(
        itm => itm?.galleryPath === item?.node?.image?.uri,
      );
      if (findIndex > -1) {
        if (selectedItems.current?.length > 1) {
          tempItems.splice(findIndex, 1);
          selectedItems.current = tempItems;
          imageRef?.current?.onChangeSource(tempItems[tempItems?.length - 1]);
          tempItems.map((value, refIndex) => {
            elRefs[value?.index]?.current?.setCounterText(refIndex + 1);
          });
          setIsSelected(false);
        }
      } else {
        setIsSelected(true);
        tempItems.push({
          uri,
          type: item?.node?.type,
          index,
          galleryPath: item?.node?.image?.uri,
        });
        imageRef?.current?.onChangeSource(tempItems[tempItems?.length - 1]);
        selectedItems.current = tempItems;
        setSelectNumber(tempItems.length);
      }
    };

    const onPress = async () => {
      let uri = await getAbsoluteIosPath(item);
      selectedItems.current = [
        {
          uri,
          type: item?.node?.type,
          index,
          galleryPath: item?.node?.image?.uri,
        },
      ];
      if (preItemIndexRef?.current != index) {
        setSelectNumber(1);
        setIsSelected(true);
        if (preItemIndexRef?.current != -1) {
          elRefs[preItemIndexRef?.current]?.current?.setCounterText(0);
          elRefs[preItemIndexRef?.current]?.current?.setCheck(false);
        }
        preItemIndexRef.current = index;
      }
      imageRef?.current?.onChangeSource(selectedItems.current?.[0]);
    };

    useImperativeHandle(ref, () => ({
      setCheck: onCheckValueChanged,
      setCounterText: onSetCounterText,
      onPress,
    }));
    const onSetCounterText = (value: number) => {
      setSelectNumber(value);
    };
    const onCheckValueChanged = value => {
      setIsSelected(value);
    };

    return (
      <VStack style={styles.container}>
        {!item?.node?.type?.includes('image') && (
          <VStack
            position="absolute"
            top="0"
            p="1"
            left="0"
            alignSelf="center"
            zIndex={1}
            rounded="xl">
            <VideoPlayIconSet />
          </VStack>
        )}
        <VStack
          position="absolute"
          top="0"
          pt="2"
          px="4"
          right="0"
          h={enableMultiSelect ? undefined : 0}
          opacity={enableMultiSelect ? 1 : 0}
          style={{
            zIndex: enableMultiSelect ? 1000 : -1000,
          }}
          rounded="xl">
          <TouchableOpacity
            disabled={!enableMultiSelect}
            onPress={onCheckboxPressed}>
            <Selector
              defaultValue={false}
              isChecked={isSelected && enableMultiSelect}
              selectNumber={selectNumber}
            />
          </TouchableOpacity>
        </VStack>
        <TouchableOpacity
          onPress={enableMultiSelect ? onCheckboxPressed : onPress}>
          <Image
            source={{uri: item?.node?.image?.uri}}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              opacity: isSelected ? 0.3 : 1,
            }}
          />
        </TouchableOpacity>
      </VStack>
    );
  },
);
export default memo(GalleryItem);

const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 3 - 1,
    height: deviceHeight * 0.27,
  },
});
