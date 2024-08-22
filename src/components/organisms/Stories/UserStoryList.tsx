import {VStack} from 'native-base';
import React, {createRef, memo, useEffect, useMemo, useState} from 'react';
import {Typography} from '~/components/elemental';
import StoryItem from './StoryItem';
import {useGetStories} from './hooks';
import {ActivityIndicator} from 'react-native';
import {model} from '~/data/model';
import StoryItemTopOptions from './StoryItemTopOptions';
import {getSubtractedDate} from '../SocialHome/HomeSectionStory';

const storyHour = model?.metaData?.configs?.socialStory?.time ?? 24;

const UserStoryList = ({
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
  const [refCreated, setRefCreated] = useState(false);
  const [startStoryIndex, setStartStoryIndex] = useState(-1);
  const [dataLoaded, setDataLoaded] = useState(startStoryId ? false : true);
  const elRefs = React.useRef();

  const gteDtate = useMemo(() => {
    return getSubtractedDate(new Date(), storyHour, 'h');
  }, []);

  const {data, isLoading, hasNextPage, fetchNextPage, isRefetching} =
    useGetStories({
      where: {
        and: [
          {story: {userId: {eq: item?.user?.id}}},
          {story: {isDraft: {eq: false}}},
          {
            or: [
              {story: {lastModifiedDate: {gte: gteDtate}}},
              {story: {createdDate: {gte: gteDtate}}},
            ],
          },
        ],
      },
    });

  useEffect(() => {
    if (data?.pages?.length > 0) {
      if (startStoryId) {
        let index = data?.pages?.findIndex(
          (item: any) => item?.id === startStoryId,
        );
        if (index > -1) {
          setStartStoryIndex(index);
          setDataLoaded(true);
        } else if (index === -1) {
          setStartStoryIndex(-2);
        }
      }
      data?.pages.forEach((item, index) => {
        elRefs[index] = createRef();
      });
      setRefCreated(true);
    } else if (hasNextPage) {
      fetchNextPage();
    }
  }, [data]);

  return (
    <>
      {data?.pages?.length > 0 && refCreated && dataLoaded && !isRefetching ? (
        <StoryItem
          {...{
            data: data?.pages,
            totalCount: data?.pages?.length,
            seenIndex: startStoryId
              ? startStoryIndex
              : seenIndex === 0
              ? 0
              : seenIndex + 1,
            storyIndex,
            itemIndex,
            goToNextUserStory,
            goToPreviewsUserStory,
            onSeenStory,
            storyOwner: item?.storyOwner,
            elRefs,
            userStory,
            isPreview,
          }}
        />
      ) : (
        <VStack flex="1">
          <VStack alignItems="center" justifyContent="center" flex="1">
            {(startStoryIndex === -2 && !isLoading) ||
            (!isLoading && !isRefetching && data?.pages?.length === 0) ? (
              <VStack flex="1" width="100%">
                <StoryItemTopOptions item={item} />
                <Typography alignSelf={'center'} mt="90%">
                  Story is not available!
                </Typography>
              </VStack>
            ) : (
              <ActivityIndicator />
            )}
          </VStack>
        </VStack>
      )}
    </>
  );
};
export default memo(UserStoryList);
