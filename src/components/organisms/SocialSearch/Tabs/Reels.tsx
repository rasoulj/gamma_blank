import React, {useCallback} from 'react';
import {FlatList, Image, deviceWidth, scale} from '~/components/elemental';
import {useGetPosts} from '../hooks';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import {VideoPlay3} from '~/assets';

const itemWidth = (deviceWidth - 50) / 3;

const ReelsTab = ({
  searchInput,
  navigateWithName,
}: {
  searchInput?: string;
  navigateWithName: any;
}) => {
  const {
    data: reelsData,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPosts({
    where: {
      and: [
        {post: {isDraft: {eq: false}}},
        {post: {postType: {eq: 'REELS'}}},
        {post: {content: {contains: searchInput}}},
      ],
    },
  });
  const renderItem = useCallback(({item, index}) => {
    return <ListItem {...{item, index, navigateWithName}} />;
  }, []);
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
      <FlatList
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
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        setEmptyComponent
      />
    </View>
  );
};
export default ReelsTab;

const ListItem = ({item, index, navigateWithName}) => {
  const onPress = () => {
    navigateWithName('PostDetail', {
      item,
      currentIndex: 0,
      userId: item?.poster?.id,
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <>
        <Image
          source={{
            uri: item?.post?.thumbnail ?? 'https://via.placeholder.com/350x150',
          }}
          style={[
            styles.thumbnail,
            {marginRight: (index + 1) % 3 != 0 ? 4 : 0},
          ]}
          resizeMode="cover"
        />
        <View style={styles.icon}>
          <WithLocalSvg
            asset={VideoPlay3}
            width={scale(28)}
            height={scale(26)}
          />
        </View>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: itemWidth,
    borderRadius: 10,
    height: scale(222),
    marginBottom: 4,
  },
  list: {},
  flex1: {flex: 1},
  container: {flex: 1, paddingTop: 10},
  icon: {
    position: 'absolute',
    margin: 4,
    zIndex: 1000,
    right: 0,
  },
});
