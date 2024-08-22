import React, {useCallback} from 'react';
import {Tabs} from 'react-native-collapsible-tab-view';
import {
  FlatList,
  Image,
  LoadIndicator,
  deviceWidth,
  scale,
  useNavigate,
} from '~/components/elemental';
import {useGetPosts} from './hooks';
import NoPosts from './NoPosts';
import {StyleSheet, TouchableOpacity} from 'react-native';

const itemWidth = (deviceWidth - 50) / 3;

const ProfileReelsList = React.forwardRef(
  (
    {
      userId,
      hasTabView = true,
      listHeader,
    }: {
      userId: number;
      hasTabView?: boolean;
      listHeader?: any;
    },
    ref,
  ) => {
    const {
      data: reelsData,
      isLoading,
      refetch,
      hasNextPage,
      fetchNextPage,
    } = useGetPosts({
      where: {
        and: [
          {post: {posterId: {eq: userId}}},
          {post: {isDraft: {eq: false}}},
          {post: {postType: {eq: 'REELS'}}},
        ],
      },
    });

    const renderItem = useCallback(({item, index}) => {
      return <ReelsListItem {...{item, index}} />;
    }, []);
    const onLoadMore = () => {
      if (hasNextPage) fetchNextPage();
    };

    if (hasTabView)
      return (
        <>
          <Tabs.FlatList
            contentContainerStyle={styles.list}
            style={styles.flex1}
            nestedScrollEnabled
            data={reelsData?.pages ?? []}
            keyExtractor={(item): string => `${item?.post?.id}`}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            refreshing={false}
            onRefresh={refetch}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={
              !isLoading ? <NoPosts title="reels" userId={userId} /> : undefined
            }
          />
          {isLoading && <LoadIndicator />}
        </>
      );
    return (
      <>
        <FlatList
          columnWrapperStyle={styles.list}
          ListHeaderComponentStyle={styles.header}
          style={styles.flex1}
          ListHeaderComponent={listHeader}
          nestedScrollEnabled
          data={reelsData?.pages ?? []}
          keyExtractor={(item): string => `${item?.post?.id}`}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          refreshing={false}
          onRefresh={refetch}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            !isLoading ? <NoPosts title="reels" userId={userId} /> : undefined
          }
        />
        {isLoading && <LoadIndicator />}
      </>
    );
  },
);
export default ProfileReelsList;

export const ReelsListItem = ({item, index}) => {
  const {navigateWithName} = useNavigate();

  const onPress = () => {
    navigateWithName('postdetail', {
      item,
      currentIndex: index,
      userId: item?.post?.poster?.id,
      itemType: 'detail',
      postType: 'reels',
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Image
        source={{
          uri: item?.post?.thumbnail ?? 'https://via.placeholder.com/350x150',
        }}
        style={(index + 1) % 3 != 0 ? styles.thumbnail : styles.thumbnail0}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: itemWidth,
    borderRadius: 10,
    height: scale(222),
    marginBottom: 4,
    marginRight: '2%',
  },
  thumbnail0: {
    width: itemWidth,
    borderRadius: 10,
    height: scale(222),
    marginBottom: 4,
    marginRight: 0,
  },
  list: {padding: 20},
  flex1: {flex: 1},
  header: {paddingBottom: 16},
});
