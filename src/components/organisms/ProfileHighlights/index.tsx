import {useRoute} from '@react-navigation/native';
import {VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel-v4';
import {deviceHeight, deviceWidth} from '~/utils/methods';
import UserHighlightList from './UserHighlightList';
import {useNavigate} from '~/components';
import {useGetHighlights} from './hooks';
const ProfileHighlights = () => {
  const {params} = useRoute();
  const {navigation} = useNavigate();
  const userId = params?.userId;
  const currentIndex = params?.currentIndex;
  const [currentPage, setCurrentPage] = useState(currentIndex);
  const {data, isLoading, hasNextPage, fetchNextPage} = useGetHighlights({
    userId,
    order: [{highlight: {createdDate: 'DESC'}}],
  });

  const totalCount = data?.pages?.length ?? 0;
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  //_______ FlatList functions
  const flatListRef = useRef(null);
  const goToPreviewsIndex = (index: number) => {
    if (index > 0) {
      flatListRef.current?.snapToPrev();
      // setCurrentPage(index - 1);
    } else {
      navigation.goBack?.();
    }
  };

  const goToNextIndex = (index: number) => {
    if (index < totalCount - 1) {
      flatListRef.current?.snapToNext();
      // setCurrentPage(index + 1);
    } else {
      navigation.goBack();
    }
  };
  //_______ end

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const goToPreviewsUserStory = async () => {
      goToPreviewsIndex(index);
    };
    const goToNextUserStory = () => {
      goToNextIndex(index);
    };
    return (
      <>
        {currentPage === index ? (
          <UserHighlightList
            item={item}
            seenIndex={0}
            storyIndex={currentPage}
            goToNextUserStory={goToNextUserStory}
            goToPreviewsUserStory={goToPreviewsUserStory}
            onSeenStory={() => {}}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <VStack flex="1">
      <Carousel
        style={{flex: 1}}
        ref={flatListRef}
        firstItem={currentPage}
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
export default ProfileHighlights;
