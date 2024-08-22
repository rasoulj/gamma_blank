import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useGetPostComments} from '../hook';
import Layer from '../../../atoms/Layer';
import Typography from '../../../atoms/Typography';
import {IMG} from '../../../elemental';
import PostCommentItem from './PostCommentItem';
import CommentInput from './CommentInput';

const PostComment = ({
  item,
  header,
  selected,
  setSelected,
}: {
  item: any;
  header?: any;
  selected: any;
  setSelected: (item) => void;
}) => {
  const [replyTo, setReplyTo] = useState(null);

  const {
    data: dataComments,
    isLoading: isLoadingComments,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    error,
    status,
  } = useGetPostComments({
    postId: item?.id,
    where: {
      parentId: {
        eq: null,
      },
    },
  });

  const renderItem = ({item: CommentItem}) => {
    return (
      <PostCommentItem
        postId={item?.id}
        item={CommentItem}
        setReplyTo={setReplyTo}
        selected={selected}
        setSelected={setSelected}
      />
    );
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataComments?.pages}
        contentContainerStyle={{flexGrow: 1, minHeight: '100%'}}
        // refreshing={isRefetching}
        // onRefresh={refetch}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        renderItem={renderItem}
        ListHeaderComponent={header}
        ListFooterComponent={<View style={{height: 210}} />}
        // ListEmptyComponent={emptyComponent}
      />
      <CommentInput
        postId={item?.id}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
      />
    </>
  );
};

export default PostComment;

const styles = StyleSheet.create({});
