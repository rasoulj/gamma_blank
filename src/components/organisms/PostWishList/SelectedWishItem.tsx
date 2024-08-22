import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {deviceWidth, scale, useNavigate} from '~/components/elemental';
import {CheckIcon, VStack} from 'native-base';
import {GetWishPostImage} from './helper';
import AutoHeightImage from 'react-native-auto-height-image';

const WishlistItem = ({selectedItems, item, index, isSelected}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const source = useMemo(() => {
    return GetWishPostImage(item?.post);
  }, []);

  const onCheckboxPressed = () => {
    let isArray =
      selectedItems?.current && Array.isArray(selectedItems?.current);
    let tempItems = isArray ? [...selectedItems.current] : [];
    let findIndex = selectedItems?.current?.findIndex(
      itm => itm === item?.post?.id,
    );
    if (findIndex > -1) {
      tempItems.splice(findIndex, 1);
      selectedItems.current = tempItems;
      setIsHighlighted(false);
    } else {
      tempItems.push(item?.post?.id);
      selectedItems.current = tempItems;
      setIsHighlighted(true);
    }
  };

  const {navigateWithName} = useNavigate();
  const onPostDetailPress = () => {
    navigateWithName('post detail', {postId: item?.post?.id});
  };

  return (
    <TouchableOpacity
      onPress={isSelected ? onCheckboxPressed : onPostDetailPress}>
      <View
        style={[
          styles.image,
          {marginRight: (index + 1) % 3 === 0 ? 0 : deviceWidth * 0.02},
        ]}>
        <AutoHeightImage
          source={{uri: source}}
          width={deviceWidth * 0.43}
          style={[isHighlighted && {opacity: 0.3}]}
          resizeMode="cover"
        />
        {isSelected && (
          <View style={styles.selector}>
            <TouchableOpacity onPress={onCheckboxPressed}>
              {isHighlighted ? (
                <VStack
                  alignItems="center"
                  justifyContent="center"
                  width={scale(22)}
                  borderWidth={1}
                  borderColor="primary.500"
                  backgroundColor="primary.500"
                  borderRadius={scale(22) / 2}
                  height={scale(22)}>
                  <CheckIcon color="background.200" width={33} />
                </VStack>
              ) : (
                <VStack
                  borderColor="gray.50"
                  width={scale(22)}
                  height={scale(22)}
                  borderRadius={scale(22) / 2}
                  borderWidth={4}></VStack>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default WishlistItem;

const styles = StyleSheet.create({
  image: {
    borderRadius: 15,
    width: deviceWidth * 0.43,
    overflow: 'hidden',
    marginBottom: deviceWidth * 0.02,
  },
  selector: {position: 'absolute', right: 4, top: 4},
});
