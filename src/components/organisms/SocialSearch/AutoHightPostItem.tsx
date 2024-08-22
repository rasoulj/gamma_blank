import {VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {WithLocalSvg} from 'react-native-svg';
import {VideoPlay3} from '~/assets';
import {deviceWidth, scale} from '~/components/elemental';

const itemWidth = deviceWidth * 0.435;

const AutoHightPostItem = ({item, index, navigateWithName}) => {
  const itemSource = JSON?.parse(
    item?.mediaGalleryUrl ? item?.mediaGalleryUrl : '{}',
  );
  const [url, setUrl] = useState<any>();
  const [itemType, setItmeType] = useState('image');
  useEffect(() => {
    if (itemSource?.[0]?.url && itemSource?.[0]?.type === 'IMAGE') {
      setUrl(itemSource?.[0]?.url);
      setItmeType('image');
    } else {
      if (item?.thumbnail) setUrl(item?.thumbnail);
      if (itemSource?.[0]?.thumbnailUrl) setUrl(itemSource?.[0]?.thumbnailUrl);
      setItmeType('video');
    }
  }, [itemSource]);

  const onItemPress = () => {
    if (item?.postType === 'POST') {
      navigateWithName('PostDetail', {
        item: {post: item},
        postType: 'post',
      });
    } else {
      navigateWithName('PostDetail', {
        item: {post: item},
        postType: 'reel',
      });
    }
  };

  return (
    <>
      {url ? (
        <TouchableOpacity onPress={onItemPress} activeOpacity={0.8}>
          <AutoHeightImage
            source={{
              uri: url ?? 'https://via.placeholder.com/350x150',
            }}
            width={itemWidth}
            style={index === 0 ? styles.imageIndex0 : styles.image}
            resizeMode="cover"
            fallbackSource={{
              uri: 'https://via.placeholder.com/350x150',
            }}
          />
          {itemType === 'video' && (
            <VStack style={styles.icon}>
              <WithLocalSvg
                asset={VideoPlay3}
                width={scale(28)}
                height={scale(26)}
              />
            </VStack>
          )}
          {index != 0 && <VStack h={'6px'} />}
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};

export default AutoHightPostItem;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    margin: 20,
    zIndex: 1000,
    right: 0,
  },
  imageIndex0: {
    width: itemWidth,
    borderRadius: 10,
    marginBottom: 8,
    marginTop: 4,
  },
  image: {
    width: itemWidth,
    borderRadius: 10,
    marginBottom: 0,
    marginTop: 0,
  },
});
