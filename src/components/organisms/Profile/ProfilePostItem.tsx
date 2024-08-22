import {VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {useNavigate, Image, deviceWidth} from '~/components/elemental';

export const ProfileListItem = ({
  item,
  index,
  itemContainerStyle,
  numCols = 3,
}: {
  item: any;
  index: number;
  itemContainerStyle?: ViewStyle;
  numCols?: number;
}) => {
  const itemSource = JSON?.parse(
    item?.post?.mediaGalleryUrl ? item?.post?.mediaGalleryUrl : '{}',
  );
  const [url, setUrl] = useState<any>();

  useEffect(() => {
    if (item?.post?.postType === 'REELS') setUrl(item?.post?.thumbnail);
    else if (itemSource?.[0]?.url && itemSource?.[0]?.type === 'IMAGE') {
      setUrl(itemSource?.[0]?.url);
    } else {
      if (itemSource?.[0]?.thumbnailUrl) setUrl(itemSource?.[0]?.thumbnailUrl);
    }
  }, [itemSource]);

  const {navigateWithName} = useNavigate();
  const onPress = () => {
    navigateWithName('postDetail', {
      item,
      postType: 'post',
    });
  };

  return (
    <VStack
      style={
        (index + 1) % 3 != 0 ? styles.itemContainer : styles.itemContainer0
      }>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Image
          source={{
            uri: url ?? 'https://via.placeholder.com/350x150',
          }}
          style={styles.imageStyle}
          resizeMode="cover"
        />
      </TouchableOpacity>
      {index != 0 && <VStack h={'2'} />}
    </VStack>
  );
};

const itemWidth = (deviceWidth - 40) / 3;

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  itemContainer0: {
    width: itemWidth,
    borderRadius: 10,
    overflow: 'hidden',
    height: itemWidth,
    marginRight: 0,
  },
  itemContainer: {
    width: itemWidth,
    borderRadius: 10,
    overflow: 'hidden',
    height: itemWidth,
    marginRight: '2%',
  },
});
