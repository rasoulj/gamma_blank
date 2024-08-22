import React, {createRef, useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image, Typography, deviceWidth} from '~/components/elemental';
import Selector from './Selector';
import dayjs from 'dayjs';

const AddHighlghtItem = ({
  selectedItems,
  item,
  index,
  setVisibleNext,
  isSelected,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const checkBoxRef = createRef();

  useEffect(() => {
    if (isSelected) {
      let isArray =
        selectedItems?.current && Array.isArray(selectedItems?.current);
      let tempItems = isArray ? [...selectedItems.current] : [];
      checkBoxRef.current?.setCheck(true);
      tempItems.push(item);
      selectedItems.current = tempItems;
      setIsHighlighted(true);
    }
  }, [isSelected]);

  const onCheckboxPressed = () => {
    let isArray =
      selectedItems?.current && Array.isArray(selectedItems?.current);
    let tempItems = isArray ? [...selectedItems.current] : [];
    let findIndex = selectedItems?.current?.findIndex(
      itm => itm?.story?.id === item?.story?.id,
    );
    if (findIndex > -1) {
      checkBoxRef.current?.setCheck(false);
      tempItems.splice(findIndex, 1);
      selectedItems.current = tempItems;
      setIsHighlighted(false);
    } else {
      checkBoxRef.current?.setCheck(true);
      tempItems.push(item);
      selectedItems.current = tempItems;
      setIsHighlighted(true);
    }
    if (selectedItems?.current?.length > 0) setVisibleNext?.(true);
    else setVisibleNext?.(false);
  };

  const createdDate = item?.story?.createdDate;
  const dateText = useMemo(() => {
    return dayjs(new Date(item?.story?.createdDate))
      .format('DD MMM')
      ?.split(' ');
  }, [createdDate]);

  const getThumbnail = async () => {
    let mediaType = item?.story?.mediaType;
    if (mediaType === 'VIDEO') {
      setSelectedImage({path: {uri: item?.story?.thumbnail, isRemote: true}});
    } else {
      setSelectedImage({path: item?.story?.mediaUrl, isRemote: true});
    }
  };
  useEffect(() => {
    getThumbnail();
  }, [item, isSelected]);

  return (
    <TouchableOpacity onPress={onCheckboxPressed}>
      <View
        style={[styles.image, {marginRight: (index + 1) % 3 === 0 ? 0 : 2}]}>
        <Image
          src={
            item?.story?.mediaType === 'IMAGE'
              ? item?.story?.mediaUrl
              : selectedImage?.path
          }
          style={[styles.image, isHighlighted && {opacity: 0.3}]}
          resizeMode="cover"
        />
        <View style={styles.selector}>
          <TouchableOpacity onPress={onCheckboxPressed}>
            <Selector defaultValue={false} ref={checkBoxRef} />
          </TouchableOpacity>
        </View>
        <View style={styles.dateText}>
          <Typography color="gray.50" fontSize="xs">
            {dateText?.[0]}
            <Typography color="gray.300" fontSize="xs">
              {` ${dateText?.[1]}`}
            </Typography>
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default AddHighlghtItem;

const itemWidth = (deviceWidth - 44) / 3;

const styles = StyleSheet.create({
  image: {width: itemWidth, height: itemWidth * 2, marginBottom: 2},
  button: {position: 'absolute', bottom: 60, zIndex: 1, right: 20, left: 20},
  selector: {position: 'absolute', right: 4, top: 4},
  dateText: {
    position: 'absolute',
    left: 4,
    borderRadius: 5,
    top: 4,
    backgroundColor: 'rgba(39, 39, 42, 0.70)',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
});
