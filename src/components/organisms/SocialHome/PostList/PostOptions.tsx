import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo, useMemo} from 'react';
import {HStack, scale} from '~/components/elemental';
import {Typography, useNavigate} from '~/components/elemental';
import {model} from '~/data/model';
import {WithLocalSvg} from 'react-native-svg';
import {
  ShadowArchive,
  ShadowDirect,
  ShadowFillArchive,
  ShadowFillHeart,
  ShadowHeart,
  ShadowMessageText,
} from '~/assets';

const PostOptions = ({
  dtoItem,
  isText = false,
  onLikePress,
  onSharePress,
  onArchivePress,
}: {
  dtoItem: any;
  isText?: boolean;
  onLikePress: () => void;
  onSharePress: () => void;
  onArchivePress: () => void;
}) => {
  const item = dtoItem?.post;
  const {navigateWithName} = useNavigate();

  const textColor = isText ? 'gray.500' : 'black';

  const onCommentPress = () => {
    navigateWithName('post detail', {
      item: dtoItem,
      postType: item?.postType?.toLowerCase(),
    });
  };

  const configs = useMemo(() => {
    if (item?.postType?.toLowerCase() === 'post')
      return (
        model?.metaData?.configs?.socialPost ??
        model?.metaData?.configs?.socialText
      );
    if (item?.postType?.toLowerCase() === 'reels')
      return model?.metaData?.configs?.socialReels;
    return {
      share: true,
      save: true,
      like: true,
      comment: true,
    };
  }, [item]);

  return (
    <>
      <HStack
        bg={isText ? 'gray.50' : 'rgba(255, 255, 255, 0.6)'}
        borderRadius="10"
        p="2"
        px={isText ? '4' : '2'}
        space="12"
        style={isText ? styles.textContainer : styles.container}>
        <HStack space={'4'}>
          {configs?.like && (
            <TouchableOpacity style={styles.touchable} onPress={onLikePress}>
              <HStack>
                <WithLocalSvg
                  asset={
                    dtoItem?.isLikedByCurrentUser
                      ? ShadowFillHeart
                      : ShadowHeart
                  }
                  color={'background.200'}
                  size={scale(24)}
                />
                <Typography color={textColor} style={styles.text}>
                  {item?.likesCount}
                </Typography>
              </HStack>
            </TouchableOpacity>
          )}
          {configs?.comment && (
            <TouchableOpacity style={styles.touchable} onPress={onCommentPress}>
              <WithLocalSvg
                asset={ShadowMessageText}
                color={'background.200'}
                size={scale(24)}
              />
              <Typography color={textColor} style={styles.text}>
                {item?.commentCount}
              </Typography>
            </TouchableOpacity>
          )}
          {configs?.share && (
            <TouchableOpacity style={styles.touchable} onPress={onSharePress}>
              <WithLocalSvg
                asset={ShadowDirect}
                color={'background.200'}
                size={scale(24)}
              />
            </TouchableOpacity>
          )}
        </HStack>
        {configs?.save && (
          <TouchableOpacity style={styles.touchable} onPress={onArchivePress}>
            <WithLocalSvg
              asset={dtoItem?.isInWishList ? ShadowFillArchive : ShadowArchive}
              color={'background.200'}
              size={scale(24)}
            />
          </TouchableOpacity>
        )}
      </HStack>
    </>
  );
};

export default memo(PostOptions);

const styles = StyleSheet.create({
  text: {marginLeft: 4, alignSelf: 'center'},

  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContainer: {
    flexDirection: 'row',
    marginTop: 0,
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  container: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    justifyContent: undefined,
  },
});
