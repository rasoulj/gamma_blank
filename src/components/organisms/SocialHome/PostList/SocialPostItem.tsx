import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {
  createRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {ContentOptions, Layer, VStack, deviceWidth} from '~/components';
import {
  Typography,
  deviceHeight,
  getColor,
  useNavigate,
  Image,
} from '~/components/elemental';
import useIsImage from '~/components/elemental/hooks/use_is_image';
import {model} from '~/data/model';
import PostItemModal from './Modals/PostItemModal';
import UserAvatar from './UserAvatar';
import {Carousel, Pagination} from 'react-native-snap-carousel-v4';
import VideoItem from './VideoItem';

const configs = model?.metaData?.configs?.postlist || {
  like: true,
  comments: true,
  share: true,
  profile: true,
  social: true,
};
const itemHeight = deviceHeight * 0.4;
const maxCaptionChar = 140;

const PostListItem = React.forwardRef(
  (
    {
      dtoItem,
      isLikedByCurrentUser,
      usersLiked,
    }: {dtoItem: any; isLikedByCurrentUser: boolean; usersLiked?: any},
    ref,
  ) => {
    const item = dtoItem?.post;
    const {navigateWithName} = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const carouselRef = React.useRef<Carousel>(null);
    const [desLength, setDesLength] = useState(140);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [visibleOptions, setVisibleOptions] = useState(true);

    const isImage = useIsImage(item?.mediaUrl);
    const elRefs = React.useRef();

    const postItemsData = useMemo(() => {
      let items = JSON?.parse(
        item?.mediaGalleryUrl ? item?.mediaGalleryUrl : '{}',
      );
      if (item?.postType === 'REELS')
        items = [
          {
            url: item?.mediaUrl,
            id: 1,
            type: 'VIDEO',
            thumbnailUrl: item?.thumbnail,
            postType: 'REELS',
          },
        ];
      else
        items =
          items?.length > 0
            ? items
            : item?.mediaUrl
            ? [
                {
                  url: item?.mediaUrl,
                  id: 1,
                  type: isImage ? 'IMAGE' : 'VIDEO',
                  postType: 'POST',
                },
              ]
            : [];
      if (items?.length > 0) {
        items?.forEach((item: any, index: number) => {
          elRefs[index] = createRef();
        });
        return items;
      } else return;
    }, [item]);
    const keyExtractor = React.useCallback(
      (item: any, index: number) => item?.id ?? `el-${index}`,
      [],
    );

    useImperativeHandle(ref, () => ({
      play: () => {
        postItemsData?.forEach((item: any, index: number) => {
          if (index === currentIndex) {
            elRefs[index]?.current?.play();
          } else {
            elRefs[index]?.current?.pause();
          }
        });
      },
      pause: () => {
        postItemsData?.forEach((item: any, index: number) => {
          elRefs[index]?.current?.pause();
        });
      },
    }));

    useEffect(() => {
      if (postItemsData?.length > 0) {
        postItemsData?.forEach((item: any, index: number) => {
          if (index === currentIndex) {
            elRefs[index]?.current?.play();
          } else {
            elRefs[index]?.current?.pause();
          }
        });
      }
    }, [currentIndex]);

    const onItemLongPress = () => setVisibleOptions(false);
    const onItemPressOut = () => setVisibleOptions(true);

    const renderCarouselItem = ({item, index}) => {
      return (
        <>
          {item?.type === 'IMAGE' ? (
            <TouchableOpacity
              style={styles.imageContainer}
              activeOpacity={1}
              onPress={onDetailPress}
              onLongPress={onItemLongPress}
              onPressOut={onItemPressOut}>
              <Image
                src={item?.url ?? item?.uri}
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: postItemsData?.[0]?.aspectRatio ?? 1,
                  alignSelf: 'center',
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={onDetailPress}
              style={
                item?.postType === 'REELS'
                  ? styles.reelsContainer
                  : styles.mediaContainer
              }
              onLongPress={onItemLongPress}
              onPressOut={onItemPressOut}>
              <VideoItem
                source={item?.url ?? item?.uri}
                paused={true}
                ref={elRefs[index]}
                poster={item?.thumbnailUrl}
                style={
                  item?.postType === 'REELS'
                    ? styles.reelsContainer
                    : styles.mediaContainer
                }
              />
            </TouchableOpacity>
          )}
        </>
      );
    };

    const onDetailPress = () => {
      navigateWithName('postDetail', {
        item: {post: item, usersLiked, isLikedByCurrentUser},
        postType: item?.postType === 'REELS' ? 'reel' : 'post',
      });
    };

    return (
      <>
        <VStack space="2" style={styles.itemContainer}>
          <TouchableWithoutFeedback onPress={onDetailPress}>
            <UserAvatar item={item} paddingX={16} />
          </TouchableWithoutFeedback>
          {postItemsData?.length > 0 && (
            <VStack style={item?.mediaUrl ? styles.mediaContainer : undefined}>
              <VStack space="2">
                <Carousel
                  keyExtractor={keyExtractor}
                  ref={carouselRef}
                  autoplay={false}
                  sliderWidth={deviceWidth}
                  itemWidth={deviceWidth}
                  data={postItemsData}
                  renderItem={renderCarouselItem}
                  firstItem={currentIndex}
                  onSnapToItem={index => setCurrentIndex(index)}
                />
                {configs?.social && visibleOptions && (
                  <ContentOptions dtoItem={dtoItem} />
                )}
              </VStack>
              <Pagination
                dotsLength={postItemsData?.length}
                activeDotIndex={currentIndex}
                containerStyle={styles.containerStyle}
                dotStyle={[
                  styles.activeDotStyle,
                  {
                    backgroundColor: getColor({color: 'primary.400'}),
                  },
                ]}
                inactiveDotStyle={styles.dotStyle}
                inactiveDotOpacity={0.5}
                inactiveDotScale={0.9}
              />
            </VStack>
          )}
          {usersLiked?.length > 0 && (
            <Typography
              fontSize="sm"
              paddingX={'4'}
              fontWeight="400"
              color="gray.800">{`Liked by ${usersLiked?.[0]?.fullName} ${
              usersLiked?.[1] ? `and ${usersLiked?.[1].fullName}` : ''
            }${
              item?.likeCount > usersLiked?.length
                ? `and ${item?.likeCount - usersLiked?.length}`
                : ''
            } `}</Typography>
          )}
          <Layer style={{paddingHorizontal: 16}}>
            <Typography
              style={styles.contentText}
              onPress={onDetailPress}
              color="gray.800">
              {item?.content?.length > desLength
                ? (item?.content).substring(0, desLength - 3) + '...'
                : item?.content}
            </Typography>
            {item?.content?.length > maxCaptionChar &&
            desLength === maxCaptionChar ? (
              <TouchableOpacity onPress={() => setDesLength(2000)}>
                <Typography style={styles.seeMore} color="gray.400">
                  See more
                </Typography>
              </TouchableOpacity>
            ) : item?.content?.length > maxCaptionChar ? (
              <TouchableOpacity onPress={() => setDesLength(maxCaptionChar)}>
                <Typography style={styles.seeMore} color="gray.400">
                  See Less
                </Typography>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </Layer>
          {item?.commentCount > 0 && (
            <VStack px="4">
              <Typography
                onPress={onDetailPress}
                color="gray.500"
                fontSize="xs">{`Show all ${item?.commentCount} comment${
                item?.commentCount > 1 ? 's' : ''
              }`}</Typography>
            </VStack>
          )}
        </VStack>
        <PostItemModal
          item={item}
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      </>
    );
  },
);

export default memo(PostListItem);

const styles = StyleSheet.create({
  itemContainer: {},

  mediaContainer: {
    width: '100%',
    height: itemHeight,
  },

  reelsContainer: {
    width: '100%',
    height: deviceHeight * 0.7,
  },

  media: {width: '100%', height: '100%'},

  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: -240,
    backgroundColor: getColor({color: 'primary.300'}),
  },

  activeDotStyle: {
    width: 17,
    height: 6,
    borderRadius: 8,
    marginHorizontal: -140,
  },

  containerStyle: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  contentText: {fontSize: 14, fontWeight: '400'},

  seeMore: {
    fontSize: 14,
    fontWeight: '600',
  },
});
