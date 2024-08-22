import {StyleSheet} from 'react-native';
import React, {createRef, memo, useCallback, useMemo, useState} from 'react';
import {ContentOptions, Layer, VStack, deviceWidth} from '~/components';
import {
  Typography,
  isDark,
  deviceHeight,
  getColor,
} from '~/components/elemental';
import useIsImage from '~/components/elemental/hooks/use_is_image';
import {model} from '~/data/model';
import {Carousel, Pagination} from 'react-native-snap-carousel-v4';
import PostItemModal from '../SocialHome/PostList/Modals/PostItemModal';
import UserAvatar from '../SocialHome/PostList/UserAvatar';
import AutoHeightImage from 'react-native-auto-height-image';
import VideoItem from '../SocialHome/PostList/VideoItem';

const configs = model?.metaData?.configs?.postlist || {
  like: true,
  comments: true,
  share: true,
  profile: true,
  social: true,
};
const itemHeight = deviceHeight * 0.4;

const PostDetailItem = ({dtoItem}) => {
  const item = dtoItem?.post;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = React.useRef<Carousel>(null);

  const isImage = useIsImage(item?.mediaUrl);
  const elRefs = React.useRef();
  const postItemsData = useMemo(() => {
    let items = JSON?.parse(
      item?.mediaGalleryUrl ? item?.mediaGalleryUrl : '{}',
    );
    if (item?.postType === 'REELS') {
      items = [
        {
          url: item?.mediaUrl,
          id: 1,
          type: 'VIDEO',
          thumbnail: item?.thumbnail,
          postType: 'REELS',
        },
      ];
    } else
      items =
        items?.length > 0
          ? items
          : item?.mediaUrl
          ? [{url: item?.mediaUrl, id: 1, type: isImage ? 'IMAGE' : 'VIDEO'}]
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

  const renderCarouselItem = useCallback(
    ({item, index}) => {
      return (
        <>
          {item?.type === 'IMAGE' ? (
            <AutoHeightImage
              source={{uri: item?.url ?? item?.uri}}
              style={styles.fullWidth}
              resizeMode="cover"
              width={deviceWidth}
            />
          ) : (
            <VideoItem
              source={item?.url ?? item?.uri}
              style={[
                styles.mediaContainer,
                {
                  height: itemHeight,
                },
              ]}
              paused={index != currentIndex}
              ref={elRefs[index]}
              poster={item?.thumbnail ?? item?.thumbnailUrl}
            />
          )}
        </>
      );
    },
    [currentIndex],
  );

  return (
    <>
      <VStack space="2">
        <UserAvatar item={item} paddingX={16} />
        {postItemsData?.length > 0 && (
          <VStack>
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
              {configs?.social && <ContentOptions dtoItem={dtoItem} />}
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
        <Layer style={styles.horizontalPadding}>
          <Typography style={styles.contentStyle} color="gray.800">
            {item?.content}
          </Typography>
        </Layer>
      </VStack>
      <PostItemModal
        item={item}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default memo(PostDetailItem);

const styles = StyleSheet.create({
  mediaContainer: {
    width: '100%',
    height: itemHeight,
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

  fullWidth: {width: '100%'},

  contentStyle: {fontSize: 14, fontWeight: '400'},

  horizontalPadding: {paddingHorizontal: 16},
});
