import React, {useCallback, useEffect, useState} from 'react';
import {Tabs} from 'react-native-collapsible-tab-view';
import {
  LoadIndicator,
  VStack,
  deviceWidth,
  useNavigate,
} from '~/components/elemental';
import AutoHeightImage from 'react-native-auto-height-image';
import MasonryList from '@react-native-seoul/masonry-list';
import {useGetPosts} from './hooks';
import NoPosts from './NoPosts';
import {StyleSheet, TouchableOpacity} from 'react-native';
const itemWidth = (deviceWidth - 50) / 2;

const ProfilePostList = React.forwardRef(
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
      data: postData,
      isLoading,
      refetch,
      hasNextPage,
      fetchNextPage,
    } = useGetPosts({
      where: {
        and: [
          {post: {posterId: {eq: userId}}},
          {post: {isDraft: {eq: false}}},
          {post: {postType: {eq: 'POST'}}},
        ],
      },
    });
    const renderItem = useCallback(({item, i: index}) => {
      return <ListItem {...{item, index}} />;
    }, []);
    const onLoadMore = () => {
      if (hasNextPage) fetchNextPage();
    };
    if (hasTabView)
      return (
        <Tabs.ScrollView
          scrollEventThrottle={400}
          contentContainerStyle={styles.container}>
          {isLoading && <LoadIndicator />}
          <MasonryList
            style={styles.flex1}
            nestedScrollEnabled
            data={postData?.pages ?? []}
            keyExtractor={(item): string => `${item?.id}`}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            refreshing={false}
            onRefresh={refetch}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.1}
            loading={isLoading}
            ListEmptyComponent={
              isLoading ? undefined : <NoPosts userId={userId} />
            }
          />
        </Tabs.ScrollView>
      );
    return (
      <MasonryList
        contentContainerStyle={styles.container}
        ListHeaderComponentStyle={styles.header}
        data={postData?.pages ?? []}
        keyExtractor={(item): string => `${item?.id}`}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshing={false}
        onRefresh={refetch}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        loading={isLoading}
        ListHeaderComponent={listHeader?.()}
        ListEmptyComponent={isLoading ? undefined : <NoPosts userId={userId} />}
      />
    );
  },
);
export default ProfilePostList;

const ListItem = ({item, index}) => {
  const itemSource = JSON?.parse(
    item?.post?.mediaGalleryUrl ? item?.post?.mediaGalleryUrl : '{}',
  );
  const [url, setUrl] = useState<any>();
  useEffect(() => {
    if (itemSource?.[0]?.url && itemSource?.[0]?.type === 'IMAGE') {
      setUrl(itemSource?.[0]?.url);
    } else {
      if (itemSource?.[0]?.thumbnailUrl) setUrl(itemSource?.[0]?.thumbnailUrl);
    }
  }, [itemSource]);

  const {navigateWithName} = useNavigate();
  const onPress = () => {
    navigateWithName('postDetail', {
      item,
      postType: 'post',
    });
  };

  return (
    <>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <AutoHeightImage
          source={{
            uri: url ?? 'https://via.placeholder.com/350x150',
          }}
          width={itemWidth}
          style={index === 0 ? styles.imageIndex0 : styles.imageStyle}
          resizeMode="cover"
          fallbackSource={{
            uri: 'https://via.placeholder.com/350x150',
          }}
        />
      </TouchableOpacity>
      {index != 0 && <VStack h={'2'} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', padding: 20},
  flex1: {flex: 1},
  header: {paddingBottom: 16},
  imageIndex0: {
    width: itemWidth,
    borderRadius: 10,
    marginBottom: 8,
    marginTop: 4,
  },
  imageStyle: {
    width: itemWidth,
    borderRadius: 10,
    marginBottom: 0,
    marginTop: 0,
  },
});
