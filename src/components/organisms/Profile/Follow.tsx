import React, {useState} from 'react';
import SearchBox from '../SocialSearch/SearchBox';
import {StyleSheet, View} from 'react-native';
import {
  FlatList,
  LoadIndicator,
  Tabs,
  useNavigate,
  useRoute,
} from '~/components';
import {Box} from 'native-base';
import {useGetFollowers} from './hooks';
import useAuthStore from '~/stores/authStore';
import FollowItem from './FollowItem';
import useHeader from '~/components/elemental/hooks/use_header';

const FollowTab = ({
  userId,
  type,
  text,
  navigateWithName,
}: {
  userId: number;
  type: 'follower' | 'following';
  text?: any;
  navigateWithName: any;
}) => {
  const currentUser = useAuthStore(state => state.user);
  const isCurrentUser = currentUser?.id === userId;

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useGetFollowers({
    userId,
    where:
      text?.length > 0
        ? {
            and: [
              {isFollower: {eq: type === 'follower'}},
              {user: {fullName: {contains: text}}},
            ],
          }
        : {
            and: [{isFollower: {eq: type === 'follower'}}],
          },
  });
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };
  const renderItem = ({item, index}) => (
    <FollowItem {...{item, index, isCurrentUser, type, navigateWithName}} />
  );
  return (
    <View style={styles.tabContainer}>
      {isLoading && <LoadIndicator />}
      <FlatList
        data={data?.pages}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Box h="2" />}
        onEndReached={onLoadMore}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        setEmptyComponent
        refreshing={false}
        onRefresh={refetch}
      />
    </View>
  );
};

const Follow = () => {
  const {} = useHeader({hidden: true});

  const route = useRoute();
  const userId = route?.params?.userId;
  const type = route?.params?.type ?? 'Followers';
  const [text, onChangeText] = useState('');
  const {navigateWithName} = useNavigate();
  const tabs = [
    {
      id: 'Followers',
      label: 'Followers',
      component: (
        <FollowTab
          userId={userId}
          type="follower"
          text={text}
          navigateWithName={navigateWithName}
        />
      ),
    },
    {
      id: 'Followings',
      label: 'Followings',
      component: (
        <FollowTab
          userId={userId}
          type="following"
          text={text}
          navigateWithName={navigateWithName}
        />
      ),
    },
  ];
  return (
    <View style={styles.container}>
      <SearchBox onChangeText={onChangeText} type="input" hasBackIcon />
      <Box h="2" />
      <Tabs tabs={tabs} activeTab={type} />
    </View>
  );
};
export default Follow;

const styles = StyleSheet.create({
  container: {flex: 1},
  tabContainer: {flex: 1, marginTop: 20},
});
