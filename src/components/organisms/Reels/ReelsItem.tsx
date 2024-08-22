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
  relativeTimeFromNow,
} from '~/components/elemental';
import CustomVideo from '~/components/atoms/CustomVideo';
import UserAvatar from '~/components/molecules/UserAvatar';
import {
  ArrowLeftIconSet,
  ContentOptions,
  SocialPostItemModal,
  useNavigate,
} from '~/components';
import ReelsReviewActionSheet from './ReelsReviewActionSheet';
import LinearGradient from 'react-native-linear-gradient';
import postStore from '~/stores/postStore';
import VolumeView from './VolumeView';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import ReelsConfigHeader from './ReelsConfgHeader';

const maxCaptionChar = 90;

const ReelsItem = forwardRef(
  (
    {
      item,
      index,
      height,
      type = 'list',
    }: {item: any; index: number; height?: number; type?: 'list' | 'detail'},
    ref,
  ) => {
    const [isPaused, setIsPaused] = useState(type === 'detail' ? false : true);
    const [desLength, setDesLength] = useState(maxCaptionChar);
    const [visibleReviewModal, setVisibleReviewModal] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [visibleOptions, setVisibleOptions] = useState(true);
    const {mutePosts, setMutePosts} = postStore(state => state);
    const [visibleMuteIcon, setVisibleMuteIcon] = useState(false);
    const {isReelsOnly} = useSocialTypesConfig();

    const onReviewPress = () => setVisibleReviewModal(true);
    const onCloseReviewModal = () => setVisibleReviewModal(false);

    useImperativeHandle(ref, () => ({
      pause: onPauseVideo,
      play: onPlayVideo,
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
    const onItemPress = () => {
      setMutePosts(!mutePosts);
      setVisibleMuteIcon(true);
      setTimeout(() => {
        setVisibleMuteIcon(false);
      }, 1000);
    };

    const textColor = '#FAFAFA';

    const DotIcon = useMemo(
      () => (
        <TouchableOpacity style={styles.marginRight} onPress={onPressDotIcon}>
          <TreeDotIcon color={textColor} />
        </TouchableOpacity>
      ),
      [],
    );

    const {navigation} = useNavigate();
    const onBackPress = () => navigation.goBack();

    return (
      <>
        <View
          style={{
            height: height ? height : '98%',
          }}>
          {visibleMuteIcon && <VolumeView mutePosts={mutePosts} />}
          <TouchableWithoutFeedback
            onPressOut={onItemPressOut}
            onLongPress={onItemLongPress}
            onPress={onItemPress}
            style={styles.video}>
            <View style={styles.optionsContainer}>
              {visibleOptions ? (
                isReelsOnly ? (
                  <ReelsConfigHeader DotIcon={DotIcon} />
                ) : (
                  <LinearGradient
                    style={styles.topOptions}
                    colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']}>
                    {type === 'list' ? (
                      <UserAvatar
                        user={item?.post?.poster}
                        containerStyle={styles.avatarContainer}
                        extraData={dateText}
                        rightIcon={DotIcon}
                        color={textColor}
                      />
                    ) : (
                      <View style={styles.detailTopContainer}>
                        <ArrowLeftIconSet
                          color={textColor}
                          onPress={onBackPress}
                        />
                        <Typography
                          color={textColor}
                          fontSize="lg"
                          fontWeight="600">
                          Reels detail
                        </Typography>
                        {DotIcon}
                      </View>
                    )}
                  </LinearGradient>
                )
              ) : (
                <></>
              )}
              <LinearGradient
                style={styles.bottomOptions}
                locations={[0.01, 0.9]}
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}>
                {visibleOptions && (
                  <View style={styles.captionContainer}>
                    {(type === 'detail' || isReelsOnly) && (
                      <UserAvatar
                        user={item?.post?.poster}
                        hasShadow={false}
                        containerStyle={styles.detailAvatarContainer}
                        extraData={item?.post?.locations ?? dateText}
                        color={textColor}
                      />
                    )}
                    <Typography
                      color={textColor}
                      fontWeight="400"
                      fontSize="sm"
                      mr={8}>
                      <Typography
                        color={textColor}
                        fontWeight="500"
                        fontSize="xs">
                        {item?.post?.poster?.fullName}{' '}
                      </Typography>
                      {item?.post?.content?.length > desLength
                        ? `${(item?.post?.content).substring(
                            0,
                            desLength - 3,
                          )} ...`
                        : item?.post?.content}
                    </Typography>
                    {item?.post?.content?.length > maxCaptionChar &&
                    desLength === maxCaptionChar ? (
                      <TouchableOpacity onPress={() => setDesLength(2000)}>
                        <Typography style={styles.seeMore} color={textColor}>
                          See more
                        </Typography>
                      </TouchableOpacity>
                    ) : item?.post?.content?.length > maxCaptionChar ? (
                      <TouchableOpacity
                        onPress={() => setDesLength(maxCaptionChar)}>
                        <Typography style={styles.seeMore} color={textColor}>
                          See Less
                        </Typography>
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                )}
                <View>
                  {visibleOptions && (
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
                isMute={mutePosts}
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
  seeMore: {
    fontSize: 14,
    fontWeight: '600',
  },

  video: {
    height: '100%',
    width: deviceWidth,
  },

  bottomOptions: {
    padding: 16,
    paddingBottom: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
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

  detailTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },

  detailAvatarContainer: {marginBottom: 8},

  marginRight: {right: 0},
});
