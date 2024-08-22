import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View, ViewToken, ViewabilityConfig} from 'react-native';
import {useGetPosts} from './hooks';
import {
  FlatList,
  LoadIndicator,
  deviceHeight,
  useRoute,
} from '~/components/elemental';
import ReelsItem from './ReelsItem';
import useAuthStore from '~/stores/authStore';
import EmptyState from '../SocialHome/PostList/EmptyState';

const viewAbilityConfig: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 80,
  minimumViewTime: 50,
};

const Reels = () => {
  const [screenHeight, setScreenHeight] = useState<number>(0);
  const user = useAuthStore(state => state.user);
  const route = useRoute();
  const params = route?.params;
  const userId = params?.userId;
  const currentIndex = params?.currentIndex;
  const itemType = params?.itemType ?? 'list';

  const {
    data: reelsData,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useGetPosts({
    where: userId
      ? {
          and: [
            {post: {isDraft: {eq: false}}},
            {post: {postType: {eq: 'REELS'}}},
            {post: {posterId: {eq: userId}}},
          ],
        }
      : {
          and: [
            {post: {isDraft: {eq: false}}},
            {post: {postType: {eq: 'REELS'}}},
            {post: {posterId: {neq: user?.id}}},
          ],
        },
  });

  const elRefs = React.useRef();
  const [refCrated, setRefCreated] = useState(false);
  useEffect(() => {
    if (!isLoading && reelsData?.totalCount === 0) setRefCreated(true);
    reelsData?.pages?.forEach((item: any, index: number) => {
      elRefs[item?.post?.id] = createRef();
      if (index === reelsData?.pages?.length - 1) {
        setRefCreated(true);
      }
    });
  }, [reelsData]);

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <ReelsItem
          {...{
            item,
            index,
            ref: elRefs[item?.post?.id],
            height: screenHeight,
            type: itemType,
          }}
        />
      );
    },
    [screenHeight],
  );

  const onViewableItemsChanged = useCallback(
    (info: {viewableItems: Array<ViewToken>; changed: Array<ViewToken>}) => {
      let index2 = -1;
      info.changed.forEach((item, index) => {
        const cell = elRefs[item?.item?.post?.id];
        if (cell && cell?.current) {
          if (index2 === -1 && item?.isViewable) {
            cell.current.play();
            index2 = 0;
          } else {
            cell.current?.pause();
          }
        }
      });
    },
    [],
  );

  const flatListRef = useRef<FlatList>();
  useEffect(() => {
    if (currentIndex > 0 && refCrated) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [currentIndex, refCrated]);

  const onScrollToIndexFailed = (info: any) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef?.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };

  return (
    <View
      onLayout={event => setScreenHeight(event.nativeEvent.layout.height)}
      style={styles.flex1}>
      {refCrated ? (
        <FlatList
          ref={flatListRef}
          data={reelsData?.pages}
          isLoading={isLoading}
          onRefresh={refetch}
          refreshing={false}
          setEmptyComponent
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <EmptyState />
            </View>
          }
          renderItem={renderItem}
          viewabilityConfig={viewAbilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          onEndReached={loadMore}
          onScrollToIndexFailed={onScrollToIndexFailed}
          pagingEnabled
          keyExtractor={(item, index) => `${item?.post?.id}`}
        />
      ) : (
        <LoadIndicator />
      )}
    </View>
  );
};

export default Reels;

const styles = StyleSheet.create({
  flex1: {flex: 1},

  emptyState: {
    flex: 1,
    height: deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
