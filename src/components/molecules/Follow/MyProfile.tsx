import {View, FlatList, Pressable} from 'react-native';

import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Header,
  Input,
  Layer,
  Screen,
  SearchNormalIconSet,
  Tabs,
  Typography,
  User2Icon,
  getColor,
  isDark,
  useAuth,
  useDebounce,
  useNavigate,
} from '../../elemental';
import Image from '../../atoms/Image';

import {
  useFollowUser,
  useGetFollowers,
  useRemoveFollowers,
  useUnfollowUser,
} from './hooks';
import {useRoute} from '@react-navigation/native';

function Followers({kit}) {
  const followers = kit?.data?.pages?.filter(item => item?.isFollower) || [];
  return (
    <Layer style={{flex: 1, marginTop: 16}}>
      <FlatList
        data={followers}
        onEndReached={kit.loadMore}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListHeaderComponent={
          <Input
            placeholder="Search"
            onChange={kit.handleOnChange}
            defaultValue={kit.query}
            mb={8}
            mt={4}
            pl={2}
            borderRadius={8}
            InputLeftElement={
              <SearchNormalIconSet
                color={getColor({color: 'gray.400'})}
                style={{marginLeft: 16}}
              />
            }
          />
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: '100%',
              height: 1,
              backgroundColor: isDark
                ? getColor({color: 'gray.500'})
                : getColor({color: 'gray.300'}),
              marginTop: 9,
              marginBottom: 9,
            }}
          />
        )}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {kit.isLoading ? (
                <Typography>Loading ...</Typography>
              ) : (
                followers.length === 0 && (
                  <Typography>No data found!</Typography>
                )
              )}
            </View>
          );
        }}
        renderItem={({item, index}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: 5,
            }}>
            <Layer
              style={{
                flexDirection: 'row',
                width: '70%',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  kit.navigateWithName('profile', {item: item?.user});
                }}>
                {item?.user?.photoUrl ? (
                  <Image
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 50,
                    }}
                    alt={item?.user?.fullName}
                    source={{uri: item?.user?.photoUrl}}
                  />
                ) : (
                  <User2Icon width={45} height={45} />
                )}
              </Pressable>
              <Typography style={{fontSize: 15, marginLeft: 15, color: 'red'}}>
                {item?.user?.fullName}
              </Typography>
            </Layer>
            <Button
              variant="solid"
              style={{width: 110}}
              onPress={() => {
                kit.removeFollower({followerId: item?.user?.id});
              }}>
              Remove
            </Button>
          </View>
        )}
      />
    </Layer>
  );
}

function Followings({kit}) {
  const followings = kit?.data?.pages?.filter(item => !item?.isFollower) || [];
  //item?.followedByCurrentUser
  return (
    <Layer style={{flex: 1, marginTop: 16}}>
      <FlatList
        data={followings}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListHeaderComponent={
          <Input
            placeholder="Search"
            onChange={kit.handleOnChange}
            defaultValue={kit.query}
            mb={8}
            mt={4}
            pl={2}
            borderRadius={8}
            InputLeftElement={
              <SearchNormalIconSet
                color={getColor({color: 'gray.400'})}
                style={{marginLeft: 16}}
              />
            }
          />
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: '100%',
              height: 1,
              backgroundColor: isDark
                ? getColor({color: 'gray.500'})
                : getColor({color: 'gray.300'}),
              marginTop: 9,
              marginBottom: 9,
            }}
          />
        )}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {kit.isLoading ? (
                <Typography>Loading ...</Typography>
              ) : (
                followings.length === 0 && (
                  <Typography>No data found!</Typography>
                )
              )}
            </View>
          );
        }}
        renderItem={({item, index}) => (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginVertical: 10,
                marginHorizontal: 5,
              }}>
              <Layer
                style={{
                  flexDirection: 'row',
                  width: '70%',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => {
                    kit.navigateWithName('profile', {item: item?.user});
                  }}>
                  {item?.user?.photoUrl ? (
                    <Image
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 50,
                      }}
                      alt={item?.user?.fullName}
                      source={{uri: item?.user?.photoUrl}}
                    />
                  ) : (
                    <User2Icon width={45} height={45} />
                  )}
                </Pressable>
                <Typography
                  style={{fontSize: 15, marginLeft: 15, color: 'red'}}>
                  {item?.user?.fullName}
                </Typography>
              </Layer>
              {item?.followedByCurrentUser ? (
                <Button
                  onPress={() =>
                    kit.unfollowUser({input: {followedId: item?.user?.id}})
                  }
                  variant="outline"
                  style={{width: 110}}>
                  Unfollow
                </Button>
              ) : (
                <Button
                  onPress={() =>
                    kit.followUser({input: {followedId: item?.user?.id}})
                  }
                  variant="solid"
                  style={{width: 110}}>
                  Follow
                </Button>
              )}
            </View>
          </>
        )}
      />
    </Layer>
  );
}

export default function MyProfile() {
  const {user} = useAuth();
  const route = useRoute<any>();
  const userId = route?.params?.item?.userId || user?.id;
  const tab = route?.params?.item?.tab;
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const {fetchNextPage, hasNextPage, ...rest} = useGetFollowers({
    userId,
    ...(debouncedQuery && {
      where: {
        user: {
          fullName: {
            contains: debouncedQuery,
          },
        },
      },
    }),
  });

  const {navigateWithName} = useNavigate();
  const {mutate: removeFollower} = useRemoveFollowers(userId);
  const {mutate: followUser} = useFollowUser();
  const {mutate: unfollowUser} = useUnfollowUser();
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const handleOnChange = useCallback(text => setQuery(text), []);
  const kit = {
    ...rest,
    loadMore,
    removeFollower,
    followUser,
    unfollowUser,
    handleOnChange,
    navigateWithName,
    query,
  };
  const tabs = [
    {id: 'followers', label: 'Followers', component: <Followers kit={kit} />},
    {
      id: 'followings',
      label: 'Followings',
      component: <Followings kit={kit} />,
    },
  ];

  return (
    <Screen>
      <Tabs tabs={tabs} activeTab={tab} activeColor="primary.400" />
    </Screen>
  );
}
