import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import {Image, View, scale} from '~/components/elemental';
import {Typography, getColor} from '~/components/elemental';
import {WithLocalSvg} from 'react-native-svg';
import {
  HeartPng,
  ShadowArchive,
  ShadowDirect,
  ShadowFillHeart,
  ShadowMessageText,
} from '~/assets';
import {model} from '~/data/model';

const configs = model?.metaData?.configs?.socialReels || {
  share: true,
  save: true,
  like: true,
  comment: true,
};

const ReelsOptions = ({
  dtoItem,
  onLikePress,
  onSharePress,
  onCommentPress,
  onArchivePress,
}) => {
  const item = dtoItem?.post;

  return (
    <>
      <View style={styles.optionContainer}>
        {configs?.like && (
          <OptionItem
            asset={ShadowFillHeart}
            isFill={dtoItem?.isLikedByCurrentUser}
            counter={item?.likesCount}
            onPress={onLikePress}
            fillColor={getColor({color: 'error.500'})}
            imageSource={dtoItem?.isLikedByCurrentUser ? undefined : HeartPng}
          />
        )}
        {configs?.comment && (
          <OptionItem
            asset={ShadowMessageText}
            onPress={onCommentPress}
            counter={item?.commentCount}
          />
        )}
        {configs?.share && (
          <OptionItem
            asset={ShadowDirect}
            counter={item?.shareCount}
            onPress={onSharePress}
          />
        )}
        {configs?.save && (
          <OptionItem
            asset={ShadowArchive}
            isFill={dtoItem?.isInWishList}
            containerStyle={styles.container}
            onPress={onArchivePress}
            isArchive={true}
          />
        )}
      </View>
    </>
  );
};

export default memo(ReelsOptions);

const OptionItem = ({
  asset,
  onPress,
  counter,
  isFill,
  containerStyle,
  fillColor,
  isArchive = false,
  imageSource,
}: {
  asset: any;
  onPress?: any;
  counter?: any;
  isFill?: boolean;
  containerStyle?: ViewStyle;
  fillColor?: string;
  isArchive?: boolean;
  imageSource?: any;
}) => {
  const iconColor = getColor({color: 'gray.800'});
  const textColor = 'black';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.touchable,
        containerStyle && {
          ...containerStyle,
        },
        {marginBottom: isArchive ? 0 : 16},
      ]}>
      <View>
        {imageSource ? (
          <Image source={HeartPng} style={styles.imageAsset} />
        ) : (
          <WithLocalSvg
            asset={asset}
            color={isFill ? fillColor : 'background.100'}
            width={isArchive ? scale(28) : scale(24)}
            height={isArchive ? scale(28) : scale(24)}
            fill={isFill ? 'black' ?? iconColor : 'transparent'}
          />
        )}
        {!isArchive && (
          <Typography
            color={textColor}
            style={{marginTop: 4}}
            alignSelf={'center'}>
            {counter ?? '0'}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  optionContainer: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginBottom: 24,
  },

  imageAsset: {width: scale(28), height: scale(28)},

  container: {marginTop: 16},
});
