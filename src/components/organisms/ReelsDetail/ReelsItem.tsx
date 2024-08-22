import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Image,
  TreeDotIcon,
  Typography,
  deviceWidth,
  getColor,
  relativeTimeFromNow,
} from '~/components/elemental';
import CustomVideo from '~/components/atoms/CustomVideo';
import UserAvatar from '~/components/molecules/UserAvatar';
import {ContentOptions, SocialPostItemModal} from '~/components';
import ReelsReviewActionSheet from './ReelsReviewActionSheet';
import LinearGradient from 'react-native-linear-gradient';

const ReelsItem = forwardRef(
  ({item, index, height}: {item: any; index: number; height?: number}, ref) => {
    const [isPaused, setIsPaused] = useState(true);
    const [visibleReviewModal, setVisibleReviewModal] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [viisbleOptions, setVisibleOptions] = useState(true);

    const onReviewPress = () => setVisibleReviewModal(true);
    const onCloseReviewModal = () => setVisibleReviewModal(false);

    useImperativeHandle(ref, () => ({
      pauseVideo: onPauseVideo,
      playVideo: onPlayVideo,
    }));
    const onPauseVideo = () => {
      setIsPaused(true);
    };
    const onPlayVideo = () => {
      setIsPaused(false);
    };
    const dateText = useMemo(() => {
      return relativeTimeFromNow(item?.post?.createdDate);
    }, [item]);

    const onPressDotIcon = () => setVisibleMenu(true);
    const onCloseMenu = () => setVisibleMenu(false);

    const onItemLongPress = () => {
      setVisibleOptions(false);
    };
    const onItemPressOut = () => setVisibleOptions(true);

    return (
      <>
        <View
          style={{
            height: height ? height - 10 : '98%',
          }}>
          <TouchableWithoutFeedback
            onPressOut={onItemPressOut}
            onLongPress={onItemLongPress}
            style={styles.video}>
            <View style={styles.optionsContainer}>
              <View style={styles.topOptions}>
                <UserAvatar
                  user={item?.post?.poster}
                  color="gray.50"
                  containerStyle={styles.avatarContainer}
                  extraData={dateText}
                  rightIcon={
                    <TouchableOpacity
                      style={{right: 0}}
                      onPress={onPressDotIcon}>
                      <TreeDotIcon color={getColor({color: 'gray.50'})} />
                    </TouchableOpacity>
                  }
                />
              </View>
              <LinearGradient
                style={styles.bottomOptions}
                locations={[0.01, 0.9]}
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}>
                {viisbleOptions && (
                  <View style={styles.captionContainer}>
                    <Typography
                      color="gray.50"
                      fontWeight="500"
                      fontSize="sm"
                      numberOfLines={2}>
                      {item?.post?.poster?.fullName}
                      {'  '}
                      <Typography
                        color="gray.50"
                        fontWeight="400"
                        fontSize="sm">
                        {item?.post?.content}
                      </Typography>
                    </Typography>
                  </View>
                )}
                <View>
                  {viisbleOptions && (
                    <ContentOptions
                      dtoItem={item}
                      contentType="REELS"
                      onCommentPress={onReviewPress}
                    />
                  )}
                </View>
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.mediaContainer}>
            {isPaused && height ? (
              <Image
                style={styles.video}
                resizeMode="cover"
                src={item?.post?.thumbnail}
              />
            ) : (
              <CustomVideo
                style={styles.video}
                resizeMode="cover"
                source={item?.post?.mediaUrl}
                poster={item?.post?.thumbnail}
                paused={height && isPaused}
              />
            )}
          </View>
        </View>
        {visibleReviewModal && (
          <ReelsReviewActionSheet
            isVisible={visibleReviewModal}
            onClose={onCloseReviewModal}
            postId={item?.post?.id}
          />
        )}
        {visibleMenu && (
          <SocialPostItemModal
            item={item?.post}
            onClose={onCloseMenu}
            isVisible={visibleMenu}
          />
        )}
      </>
    );
  },
);
export default memo(ReelsItem);

const styles = StyleSheet.create({
  video: {
    height: '100%',
    width: deviceWidth,
  },
  bottomOptions: {
    padding: 16,
    paddingBottom: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  topOptions: {},
  captionContainer: {flex: 1, justifyContent: 'flex-end', marginBottom: 12},
  avatarContainer: {padding: 16, paddingBottom: 20},
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  mediaContainer: {
    position: 'absolute',
    zIndex: -100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
