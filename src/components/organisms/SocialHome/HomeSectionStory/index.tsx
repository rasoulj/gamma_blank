import React, {memo, useCallback, useMemo, useState} from 'react';
import {FlatList, Image, useNavigate, Box, HStack, VStack} from '~/components';
import {AddIconSet, Typography, scale} from '~/components/elemental';
import {
  useGetFollowersId,
  useGetLastStories,
  useGetLiveStoriesUser,
  useGetMyStoryCounter,
} from '../hook';
import useAuthStore from '~/stores/authStore';
import {StyleSheet, TouchableOpacity} from 'react-native';
import StoryHeaderItem from './StoryHeaderItem';
import dayjs from 'dayjs';
import {getColor} from '~/utils/helper/theme.methods';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import useUpdateVonageData from '../UpdateVonageData';
import User3Icon from '~/assets/icons/user3icon';
import EmptyState from '../PostList/EmptyState';

const itemSize = scale(60);
const radius = 16;

export const getSubtractedDate = (
  date: Date,
  value: number,
  unit: dayjs.ManipulateType,
) => {
  return dayjs(date).subtract(value, unit);
};

const HomeSectionStory = ({vonageData}: {vonageData?: any}) => {
  const {user} = useAuthStore(state => state);
  const userId = user?.id;
  const {navigateWithName} = useNavigate();
  const {handleCheckElementExist} = useSocialTypesConfig();

  const {
    data: followerData,
    hasNextPage,
    fetchNextPage,
  } = useGetFollowersId({userId});

  const followersId = useMemo(() => {
    if (hasNextPage) fetchNextPage();
    else {
      return followerData?.pages?.map((item, index) => item?.user?.id);
    }
  }, [followerData]);

  const {vonageSessions} = useUpdateVonageData({
    enabled: handleCheckElementExist('live') && !vonageData,
  });
  const vongaeSessionData = vonageData ?? vonageSessions;

  const liveUsers = handleCheckElementExist('live')
    ? vongaeSessionData?.map((item: any) => item?.creator?.id)
    : [];
  const {data: storiesData} = useGetLastStories({
    where: liveUsers?.length > 0 ? {user: {id: {nin: liveUsers}}} : undefined,
    enabled: handleCheckElementExist('story'),
  });

  const {data: liveStoriesData, isLoading: liveStoriesLoading} =
    useGetLiveStoriesUser({
      enabled: vongaeSessionData?.length > 0 && handleCheckElementExist('live'),
      where: {user: {id: {in: liveUsers}}},
    });

  const [myStoryDate, setMyStoryDate] = useState(new Date());
  const {data: myStories} = useGetMyStoryCounter({
    where: {
      and: [
        {story: {isDraft: {eq: false}}},
        {
          or: [
            {
              story: {
                lastModifiedDate: {
                  gte: getSubtractedDate(
                    myStoryDate,
                    24,
                    'hours',
                  ).toISOString(),
                },
              },
            },
            {
              story: {
                createdDate: {
                  gte: getSubtractedDate(
                    myStoryDate,
                    24,
                    'hours',
                  ).toISOString(),
                },
              },
            },
          ],
        },
        {story: {userId: {eq: user?.id}}},
      ],
    },
  });

  const isStoryOnly =
    handleCheckElementExist('story') &&
    !handleCheckElementExist('live') &&
    !handleCheckElementExist('post') &&
    !handleCheckElementExist('reels');

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      if (item?.id === -1) return <>{headerComponent()}</>;
      return (
        <StoryHeaderItem
          {...{item, followersId, liveStoriesData, index, isStoryOnly}}
        />
      );
    },
    [liveStoriesData, followersId, myStories],
  );

  const itemSeparatorComponent = () => <Box w={4} h={4} />;
  const keyExtractor = useCallback((item: any, index: number) => {
    return `post${item?.id}_${index}`;
  }, []);

  const headerComponent = useCallback(() => {
    const onAddPress = () => {
      navigateWithName('AddStory', {
        type: handleCheckElementExist('story') ? 'Story' : undefined,
      });
    };
    const onMyStoryPress = () => {
      navigateWithName('Stories', {
        index: 0,
        isMine: true,
      });
    };

    const currentStory = myStories?.story_getStories?.result?.items?.[0];

    return (
      <>
        {myStories?.story_getStories?.result?.totalCount === 0 || !myStories ? (
          <TouchableOpacity onPress={onAddPress}>
            <VStack ml={isStoryOnly ? 0 : 4} mr={isStoryOnly ? 0 : 4} space={2}>
              <VStack
                borderWidth={2}
                h={itemSize}
                w={itemSize}
                borderRadius={radius}
                borderColor="gray.400"
                justifyContent="center"
                alignItems="center">
                <AddIconSet color="gray.400" />
              </VStack>
              <Typography fontSize="xs" alignSelf="center">
                {handleCheckElementExist('story') ? 'Your story' : 'Add'}
              </Typography>
            </VStack>
          </TouchableOpacity>
        ) : (
          <VStack ml={isStoryOnly ? 0 : 5} space={2} mr="4">
            <HStack>
              <TouchableOpacity
                onPress={onMyStoryPress}
                disabled={
                  myStories?.story_getStories?.result?.totalCount === 0 ||
                  !myStories
                }>
                <VStack
                  borderWidth={2}
                  h={itemSize}
                  w={itemSize}
                  borderRadius={radius}
                  overflow="hidden"
                  borderColor={
                    myStories?.story_getStories?.result?.totalCount > 0
                      ? '#006194'
                      : 'gray.400'
                  }
                  justifyContent="center"
                  alignItems="center">
                  {user?.photoUrl ? (
                    <Image
                      src={user?.photoUrl}
                      style={styles.img}
                      resizeMode="contain"
                    />
                  ) : (
                    <User3Icon width={itemSize} height={itemSize - 10} />
                  )}
                </VStack>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addContainer}
                onPress={onAddPress}>
                <AddIconSet color="background.200" />
              </TouchableOpacity>
            </HStack>
            <Typography fontSize="xs" alignSelf="center">
              {handleCheckElementExist('story') ? 'Your story' : 'Add'}
            </Typography>
          </VStack>
        )}
      </>
    );
  }, [myStories, user]);

  const finalList = useMemo(() => {
    return [].concat(
      ...(vongaeSessionData ?? []),
      ...(storiesData?.pages ?? []),
    );
  }, [vongaeSessionData, storiesData]);

  return (
    <>
      {(handleCheckElementExist('story') || handleCheckElementExist('live')) &&
      !isStoryOnly ? (
        <FlatList
          ListHeaderComponent={headerComponent}
          data={finalList ?? []}
          renderItem={renderItem}
          horizontal
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeparatorComponent}
          showsHorizontalScrollIndicator={false}
        />
      ) : isStoryOnly ? (
        <FlatList
          data={finalList ? [{id: -1}, ...finalList] : [{id: -1}]}
          renderItem={renderItem}
          numColumns={4}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeparatorComponent}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={<EmptyState />}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(HomeSectionStory);

const styles = StyleSheet.create({
  addContainer: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(28) / 2,
    backgroundColor: getColor({color: 'primary.500'}),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginStart: -(scale(28) / 2 + 3),
    marginBottom: -4,
  },

  img: {width: itemSize, height: itemSize},

  contentContainerStyle: {paddingHorizontal: 20},
});
