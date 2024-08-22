import {VStack} from 'native-base';
import React, {createRef, memo, useEffect, useState} from 'react';
import {Typography} from '~/components/elemental';
import {useGetHighlightStories} from './hooks';
import {ActivityIndicator} from 'react-native';
import StoryItem from '~/components/organisms/Stories/StoryItem';
const UserHighlightList = ({
  item,
  seenIndex,
  storyIndex,
  itemIndex,
  goToNextUserStory,
  goToPreviewsUserStory,
  onSeenStory,
  startStoryId,
  userStory = false,
  isPreview = false,
}: {
  item: any;
  seenIndex: number;
  itemIndex?: number;
  storyIndex: number;
  goToNextUserStory: any;
  goToPreviewsUserStory: any;
  onSeenStory: (storyId?: number) => void;
  startStoryId?: number;
  userStory?: boolean;
  isPreview?: boolean;
}) => {
  const [refCreated, setRefCreated] = useState(true);
  const [startStoryIndex, setStartStoryIndex] = useState(-1);
  const [dataLoaded, setDataLoaded] = useState(startStoryId ? false : true);
  const elRefs = React.useRef();

  const {data, isLoading, hasNextPage, fetchNextPage, isRefetching} =
    useGetHighlightStories({
      where: {highlight: {id: {eq: item?.highlight?.id}}},
      userId: item?.highlight?.user?.id,
    });
  const storiesData = data?.pages?.[0]?.highlight?.highlightStories;

  useEffect(() => {
    if (storiesData?.length > 0) {
      storiesData.forEach((item, index) => {
        elRefs[index] = createRef();
      });
      setRefCreated(true);
    }
  }, [storiesData]);

  return (
    <>
      {storiesData?.length > 0 && refCreated && dataLoaded && !isRefetching ? (
        <StoryItem
          {...{
            data: storiesData,
            totalCount: storiesData?.length,
            seenIndex: 0,
            storyIndex,
            itemIndex,
            goToNextUserStory,
            goToPreviewsUserStory,
            onSeenStory,
            storyOwner: {
              user: {
                photoUrl: item?.highlight?.photoUrl,
                fullName: item?.highlight?.name,
              },
            },
            elRefs,
            userStory,
            isPreview,
            isHighlight: true,
            highlightId: item?.highlight?.id,
          }}
        />
      ) : (
        <VStack flex="1">
          <VStack alignItems="center" justifyContent="center" flex="1">
            {startStoryIndex === -2 && !isLoading ? (
              <Typography>Highlight is not available!</Typography>
            ) : !isLoading && !isRefetching ? (
              <Typography>Highlight is not available!</Typography>
            ) : (
              <ActivityIndicator />
            )}
          </VStack>
        </VStack>
      )}
    </>
  );
};

export default memo(UserHighlightList);
