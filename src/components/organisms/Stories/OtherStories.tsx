import {useRoute} from '@react-navigation/native';
import {VStack} from 'native-base';
import React, {useCallback, useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel-v4';
import {deviceHeight, deviceWidth} from '~/utils/methods';
import UserStoryList from './UserStoryList';
import {useNavigate} from '~/components';
import {useGetLastStories} from './hooks';

const OtherStories = () => {
  const {params} = useRoute();
  const {navigation} = useNavigate();
  const currentIndex = params?.index ?? 0;
  const [currentPage, setCurrentPage] = useState(currentIndex);

  const {data, isLoading, hasNextPage, fetchNextPage} = useGetLastStories({});
  const totalCount = data?.pages?.length ?? 0;
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };
  const flatListRef = useRef(null);
  const goToPreviewsIndex = (index: number) => {
    if (index > 0) {
      flatListRef.current?.snapToPrev();
    } else {
      navigation.goBack?.();
    }
  };
  const goToNextIndex = (index: number) => {
    if (index < totalCount - 1) {
      flatListRef.current?.snapToNext();
    } else {
      navigation.goBack();
    }
  };

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      const goToPreviewsUserStory = async () => {
        goToPreviewsIndex(index);
      };
      const goToNextUserStory = () => {
        goToNextIndex(index);
      };
      return (
        <>
          {currentPage === index && (
            <UserStoryList
              item={item}
              itemIndex={index}
              seenIndex={0}
              storyIndex={0}
              goToNextUserStory={goToNextUserStory}
              goToPreviewsUserStory={goToPreviewsUserStory}
              onSeenStory={() => {}}
            />
          )}
        </>
      );
    },
    [currentPage],
  );

  return (
    <VStack flex="1">
      <Carousel
        style={{flex: 1}}
        ref={flatListRef}
        firstItem={currentIndex}
        data={data?.pages}
        renderItem={renderItem}
        onTouchEnd={onLoadMore}
        itemWidth={deviceWidth}
        sliderWidth={deviceWidth}
        itemHeight={deviceHeight}
        sliderHeight={deviceHeight}
        onScrollIndexChanged={index => setCurrentPage(index)}
        onSnapToItem={slideIndex => setCurrentPage(slideIndex)}
      />
    </VStack>
  );
};

export default OtherStories;
