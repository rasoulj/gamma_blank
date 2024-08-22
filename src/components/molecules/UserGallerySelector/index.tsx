import React, {
  createRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useGallery} from './hooks';
import {
  Box,
  FlatList,
  VStack,
  deviceWidth,
  getColor,
} from '~/components/elemental';
import {
  AssetType,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import GalleryHeader from './GalleryHeader';
import {useController} from 'react-hook-form';
import GalleryImage from './GalleryImage';
import GalleryItem from './GalleryItem';
import {StyleSheet} from 'react-native';

const UserGallerySelector = ({
  onGallerySelect,
  enableGallery,
  renderItem,
  assetType = 'All',
  name,
}: {
  onGallerySelect?: any;
  enableGallery?: number;
  assetType?: AssetType;
  renderItem?: ({item, index}: {item: PhotoIdentifier; index: number}) => void;
  name: string;
}) => {
  const {field} = useController({name});
  const [groupName, setGroupName] = useState();
  const [enableMultiSelect, setEnableMultiSelect] = useState(false);
  const {photos, hasNextPage, onFetchNextPage, albums, isLoading} = useGallery({
    assetType,
    groupName,
  });
  const elRefs = React.useRef();
  const [refCreated, setRefCreated] = useState(false);
  const selectedItems = useRef<any[]>([]);
  const [currentImage, setCurrentImage] = useState();
  const imageRef = useRef();

  useEffect(() => {
    photos?.forEach((item: any, index: number) => {
      elRefs[index] = createRef();
      if (index === photos?.length - 1) {
        setRefCreated(true);
      }
    });
  }, [photos]);

  useEffect(() => {
    if (refCreated) {
      setTimeout(() => {
        if (selectedItems.current.length === 0 && photos?.length > 0) {
          selectedItems.current = [
            {
              uri: photos[0]?.node?.image?.uri,
              type: photos[0]?.node?.type,
              index: 0,
            },
          ];
          elRefs[0]?.current?.onPress();
        }
      }, 100);
    }
  }, [refCreated]);
  const preItemIndexRef = useRef(-1);
  const _renderItem = useCallback(
    ({item, index}: {item: PhotoIdentifier; index: number}) => {
      return (
        <GalleryItem
          {...{
            item,
            index,
            preItemIndexRef,
            selectedItems,
            enableMultiSelect,
            elRefs,
            imageRef,
            ref: elRefs[index],
          }}
        />
      );
    },
    [enableMultiSelect],
  );
  const itemSeparatorComponent = useCallback(() => {
    return <Box height="1" />;
  }, []);
  const onNextPress = () => {
    field.onChange(selectedItems.current);
    onGallerySelect(selectedItems.current);
  };
  const onMultiSelectPress = () => {
    setEnableMultiSelect(prev => !prev);
    if (enableMultiSelect && selectedItems.current?.length > 0) {
      const lastIndex =
        selectedItems.current?.[selectedItems.current?.length - 1]?.index;
      selectedItems.current?.map(item => {
        elRefs?.[item?.index]?.current?.setCounterText(0);
        elRefs?.[item?.index]?.current?.setCheck(false);
      });
      selectedItems.current = [currentImage];
      elRefs[lastIndex]?.current?.setCounterText(1);
      elRefs[lastIndex]?.current?.setCheck(true);
    }
  };

  const onGroupNameChanged = name => {
    if (name != groupName) {
      setGroupName(name);
      selectedItems.current = [];
    }
  };

  return (
    <VStack bgColor="background.200" flex={1}>
      <GalleryImage
        ref={imageRef}
        src={{
          uri: currentImage?.uri ?? '',
        }}
        resizeMode="cover"
      />
      <GalleryHeader
        {...{
          groupName,
          setGroupName: onGroupNameChanged,
          albums,
          onNextPress,
          enableMultiSelect,
          setEnableMultiSelect: onMultiSelectPress,
        }}
      />
      {refCreated && enableGallery && (
        <FlatList
          data={photos}
          numColumns={3}
          onEndReached={hasNextPage ? onFetchNextPage : undefined}
          renderItem={renderItem ? renderItem : _renderItem}
          ItemSeparatorComponent={itemSeparatorComponent}
          contentContainerStyle={styles.contentContainerStyle}
          ListFooterComponent={() => <Box h={300} />}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
      )}
    </VStack>
  );
};
export default memo(UserGallerySelector);

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: deviceWidth,
    backgroundColor: getColor({color: 'background.500'}),
    marginBottom: 100,
  },
  columnWrapperStyle: {
    backgroundColor: getColor({color: 'background.500'}),
    justifyContent: 'space-between',
  },
});
