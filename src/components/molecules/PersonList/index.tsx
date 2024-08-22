import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {
  Divider,
  FlatList,
  RelativeLayout,
  Typography,
  useAuth,
  useDebounce,
  useNavigate,
} from '~/components/elemental';
import {useQueryClient} from 'react-query';
import useTrackedStates from '../ItemSearch/useStates';
import {useGetUsers} from './hooks';
import PersonListItem from './PersonListItem';
import {useFollowUser, useUnfollowUser} from '../Follow/hooks';

interface IProps {
  filters?: any;
}

const PersonList = ({filters}: IProps) => {
  const {searchQuery} = useTrackedStates();
  const {navigateWithName} = useNavigate();
  const {user} = useAuth();
  const debouncedQuery = useDebounce(searchQuery, 500);
  const queryClient = useQueryClient();

  const options = {
    where: {
      fullName: {
        contains: debouncedQuery,
      },
    },
  };

  const key = ['getUsers', debouncedQuery ? options : {}];

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    error,
  } = useGetUsers({
    ...(debouncedQuery && options),
  });

  const {mutate: followUser} = useFollowUser();
  const {mutate: unfollowUser} = useUnfollowUser();

  const users =
    data?.pages?.map(u => {
      if (
        u?.followers?.map(item => item?.followerId)?.includes(user?.id || 43)
      ) {
        Object.assign(u, {
          isFollowedByMe: true,
        });
        return u;
      } else {
        Object.assign(u, {
          isFollowedByMe: false,
        });
        return u;
      }
    }) || [];

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleFollowUser = async item => {
    try {
      const updatedData = queryClient.getQueryData(key);
      updatedData?.pages?.[0]?.user_getUsers?.result?.items?.map(ite => {
        if (ite?.id === item?.id) {
          ite.isFollowedByMe = true;
          ite.followers.push({followerId: user?.id});
        }

        return ite;
      });

      queryClient.setQueryData(key, updatedData);

      await followUser(
        {input: {followedId: item?.id}},
        {
          onError: error => {
            queryClient.setQueryData(key, updatedData);
            console.log(error);
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollowUser = async item => {
    try {
      const updatedData = queryClient.getQueryData(key);
      updatedData?.pages?.[0]?.user_getUsers?.result?.items?.map(ite => {
        if (ite?.id === item?.id) {
          ite.isFollowedByMe = false;
          ite.followers = ite?.followers.filter(i => i.followerId !== user?.id);
        }

        return ite;
      });
      queryClient.setQueryData(key, updatedData);

      await unfollowUser(
        {input: {followedId: item?.id}},
        {
          onError: error => {
            queryClient.setQueryData(key, updatedData);
            console.log(error);
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <PersonListItem
        {...{
          item,
          navigation: navigateWithName,
          follow: () => handleFollowUser(item),
          unFollow: () => handleUnfollowUser(item),
        }}
      />
    );
  };

  return (
    <FlatList
      data={users}
      px="4"
      keyExtractor={(_, index) => `key${index}`}
      renderItem={renderItem}
      refreshing={isRefetching}
      onRefresh={refetch}
      ItemSeparatorComponent={() => <Divider backgroundColor={'gray.300'} />}
      ListEmptyComponent={() => {
        return (
          <RelativeLayout
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable onPress={() => refetch()}>
              <Typography>
                {isLoading
                  ? 'Loading ...'
                  : users?.length === 0
                  ? 'No data'
                  : ''}
              </Typography>
            </Pressable>
          </RelativeLayout>
        );
      }}
      contentContainerStyle={[styles.contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.9}
      onEndReached={() => {
        onLoadMore?.();
      }}
    />
  );
};

export default PersonList;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  contentContainerStyle: {
    paddingTop: 10,
    flexGrow: 1,
    paddingBottom: 32,
  },
});
