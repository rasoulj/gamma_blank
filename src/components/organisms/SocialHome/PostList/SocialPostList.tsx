import {StyleSheet, View, ViewToken} from 'react-native';
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useGetFollowingPosts} from '../hook';
import {useRoute} from '@react-navigation/native';
import {Box, FlatList, LoadIndicator, ReelsList} from '~/components';
import SocialPostItem from './SocialPostItem';
import {ViewabilityConfig} from 'react-native';
import SocialTextPostItem from './SocialTextPostItem';
import postStore from '~/stores/postStore';
import {model} from '~/data/model';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import EmptyState from './EmptyState';

const viewAbilityConfig: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 50,
  minimumViewTime: 50,
};
const reelsConfig = model?.metaData?.configs?.social?.reels;
const postConfig = model?.metaData?.configs?.social?.post;

const PostList = ({listHeader}: {listHeader?: any}) => {
  const route: any = useRoute();
  const setPostQuery = postStore(state => state.setPostQuery);
  const {socialType, isReelsOnly} = useSocialTypesConfig();

  const postTypeCondition =
    reelsConfig && postConfig
      ? undefined
      : {post: {postType: {eq: reelsConfig ? 'REELS' : 'POST'}}};
  const where = route?.params?.item?.userId
    ? {
        and: [
          {
            post: {
              posterId: {
                eq: route?.params?.item?.userId,
              },
            },
          },
          {post: {isDraft: {eq: false}}},
        ],
      }
    : {post: {isDraft: {eq: false}}};
  const order = [
    {
      post: {createdDate: 'DESC'},
    },
  ];

  useEffect(() => {
    setPostQuery({where, order});
  }, [where]);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useGetFollowingPosts({
    where: postTypeCondition
      ? {and: [postTypeCondition, where?.and ? where?.and : where]}
      : where,
  });

  const elRefs = React.useRef();
  const [refCrated, setRefCreated] = useState(false);

  useEffect(() => {
    if (data?.totalCount === 0) setRefCreated(true);
    data?.pages?.forEach((item: any, index: number) => {
      elRefs[index] = createRef();
      if (index === data?.pages?.length - 1) {
        setRefCreated(true);
      }
    });
  }, [data]);

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      if (socialType === 'social')
        return (
          <SocialPostItem
            dtoItem={item}
            ref={elRefs[index]}
            isLikedByCurrentUser={item?.isLikedByCurrentUser}
            usersLiked={item?.usersLiked}
          />
        );
      return <SocialTextPostItem dtoItem={item} ref={elRefs[index]} />;
    },
    [],
  );
  const keyExtractor = useCallback((item: any, index: number) => {
    return `post${item?.id}_${index}`;
  }, []);

  const playedIndexRef = useRef(-1);
  const onViewableItemsChanged = useCallback(
    (info: {viewableItems: Array<ViewToken>; changed: Array<ViewToken>}) => {
      let index2 = -1;
      info.changed.forEach((item, index) => {
        const cell = elRefs[item?.index];
        if (cell && cell?.current) {
          if (
            index2 === -1 &&
            item?.isViewable &&
            ((item.item?.post?.mediaGalleryUrl &&
              item.item?.post?.mediaGalleryUrl?.indexOf('"type":"VIDEO"') >
                -1) ||
              item?.item?.post?.postType === 'REELS')
          ) {
            cell.current?.play();
            playedIndexRef.current = item.index;
            index2 = 0;
          } else if (
            item.item?.post?.mediaGalleryUrl &&
            (item.item?.post?.mediaGalleryUrl?.indexOf('"type":"VIDEO"') > -1 ||
              item?.item?.post?.postType === 'REELS')
          ) {
            cell.current?.pause();
          }
          if (!item?.isViewable && item?.item?.post?.postType === 'REELS')
            cell.current?.pause();
        }
      });
    },
    [],
  );

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const itemSeparator = useCallback(() => <Box h="6" />, []);

  return (
    <>
      {refCrated ? (
        data?.totalCount === 0 ? (
          <>
            {listHeader()}
            <View style={styles.emptyState}>
              <EmptyState />
            </View>
          </>
        ) : postConfig || !isReelsOnly || socialType === 'text' ? (
          <FlatList
            data={data?.pages}
            ListHeaderComponentStyle={styles.listHeaderComponentStyle}
            keyExtractor={keyExtractor}
            refreshing={false}
            isFetchingNextPage={isFetchingNextPage}
            onRefresh={refetch}
            onEndReachedThreshold={2}
            onEndReached={onEndReached}
            renderItem={renderItem}
            ListHeaderComponent={listHeader}
            ListFooterComponent={<View style={{height: 100}} />}
            viewabilityConfig={viewAbilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
            ItemSeparatorComponent={itemSeparator}
            isLoading={isLoading}
          />
        ) : (
          <ReelsList
            reelsData={data?.pages}
            onLoadMore={onEndReached}
            isLoading={isLoading}
            refetch={refetch}
            listHeader={listHeader}
            listEmtpyComponent={<EmptyState />}
          />
        )
      ) : (
        <LoadIndicator />
      )}
      {isLoading && <LoadIndicator />}
    </>
  );
};

export default PostList;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  listHeaderComponentStyle: {marginBottom: 16},

  emptyState: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
