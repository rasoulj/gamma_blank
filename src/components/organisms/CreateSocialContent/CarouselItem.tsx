import {VStack} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {
  ConfirmationActionSheet,
  CustomVideo,
  Image,
  TrashIconSet,
  deviceHeight,
} from '~/components';
import {getColor} from '~/utils/helper/theme.methods';

const CarouselItem = ({
  item,
  index,
  currentIndex,
  finalItems,
  setFinalItems,
  type = 'add',
}: {
  item: any;
  index: number;
  currentIndex: number;
  finalItems?: any[];
  setFinalItems?: (items: any) => void;
  type: string;
}) => {
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const onConfirmDelete = () => {
    let tempItems = [...finalItems];
    tempItems.splice(index, 1);
    setFinalItems(tempItems);
    setVisibleConfirm(false);
  };

  const onDeleteItemPress = () => {
    setVisibleConfirm(true);
  };
  const onCloseModal = () => setVisibleConfirm(false);

  return (
    <>
      <VStack style={styles.mediaContainer}>
        {item?.type === 'VIDEO' || item?.type === 'video' ? (
          <CustomVideo
            source={item?.uri}
            style={styles.media}
            disableController
            paused={index != currentIndex}
          />
        ) : (
          <Image source={item} style={styles.media} resizeMode="cover" />
        )}
        {type === 'edit' && finalItems?.length > 1 && (
          <VStack
            position="absolute"
            bottom={0}
            right={2}
            margin={2}
            zIndex={1000}>
            <TouchableOpacity style={styles.trash} onPress={onDeleteItemPress}>
              <TrashIconSet color="gray.50" />
            </TouchableOpacity>
          </VStack>
        )}
      </VStack>
      <ConfirmationActionSheet
        isOpen={visibleConfirm}
        onConfirmPress={onConfirmDelete}
        onClose={onCloseModal}
      />
    </>
  );
};
export default CarouselItem;

const itemHeight = deviceHeight * 0.4;

const styles = StyleSheet.create({
  mediaContainer: {
    width: '100%',
    height: itemHeight,
  },
  media: {width: '100%', height: '100%'},
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -5,
    backgroundColor: getColor({color: 'primary.300'}),
  },
  activeDotStyle: {
    width: 35,
    height: 10,
    borderRadius: 4,
    marginHorizontal: -5,
  },
  containerStyle: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trash: {
    backgroundColor: getColor({color: 'error.500'}),
    borderRadius: 16,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
