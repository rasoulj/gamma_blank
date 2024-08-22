import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import PostDetailItem from './PostDetailItem';
import CommentInput from './CommentInput';
import {VStack} from 'native-base';
import SocialTextPostItem from '../SocialHome/PostList/SocialTextPostItem';
import CommentItem from './CommentItem';
import {Box, FlatList} from '~/components/elemental';
import {useGetPostComments, useSeenPostMutation} from './hook';
import {StyleSheet} from 'react-native';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import {model} from '~/data/model';

const PostTypeDetail = ({item: postItem}) => {
  const {params} = useRoute();
  const [replyTo, setReplyTo] = useState(undefined);
  const item = postItem ?? params?.item;
  const postId = item?.post?.id;

  const {mutate} = useSeenPostMutation();
  const onSeenPost = () => {
    mutate({postId});
  };
  useEffect(() => {
    if (postId) onSeenPost();
  }, [postId]);

  const {
    data: dataComments,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useGetPostComments({
    postId: params?.item?.post?.id,
    where: {
      parentId: {
        eq: null,
      },
    },
    order: [{createdDate: 'DESC'}],
    enabled: model.metaData?.configs?.socialPost?.comment,
  });

  const renderItem = ({item, index}) => {
    const onReplyPress = (itemPress = item) => {
      setReplyTo({...itemPress, randomId: new Date().toISOString()});
    };
    return (
      <CommentItem item={item} postId={postId} onReplyPress={onReplyPress} />
    );
  };

  const listHeader = useCallback(() => {
    return <PostHeaderItem item={item} />;
  }, [item]);

  const ItemSeparatorComponent = () => <VStack h={4} />;
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };
  const ListFooterComponent = () => <Box h={100} />;

  const onSetReply = (item?: any) => {
    if (item) setReplyTo({...item, randomId: new Date().toISOString()});
    else setReplyTo(undefined);
  };

  return (
    <>
      <FlatList
        renderItem={renderItem}
        data={dataComments?.pages}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onEndReached={onLoadMore}
        onRefresh={refetch}
        refreshing={false}
        contentContainerStyle={styles.contentContainerStyle}
        isFetchingNextPage={isFetchingNextPage}
        ListFooterComponent={ListFooterComponent}
        keyExtractor={(item, index) => `comment_${item?.id}`}
      />
      {model.metaData?.configs?.socialPost?.comment && (
        <CommentInput
          replyTo={replyTo}
          setReplyTo={onSetReply}
          postId={postId}
        />
      )}
    </>
  );
};
export default PostTypeDetail;

const PostHeaderItem = ({item}) => {
  const {socialType} = useSocialTypesConfig();

  return (
    <VStack mb="6">
      {socialType != 'text' ? (
        <PostDetailItem dtoItem={item} />
      ) : (
        <SocialTextPostItem dtoItem={item} />
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {flexGrow: 1, marginBottom: 60},
});
