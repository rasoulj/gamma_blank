import React, {memo, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  HStack,
  HeartIconSet,
  RedoIconSet,
  Typography,
  VStack,
  getColor,
  relativeTimeFromNow,
} from '~/components/elemental';
import {useCreateLikeCommentPost, useRemoveLikeCommentPost} from './hook';
import {useQueryClient} from 'react-query';

const CommentOptions = ({item, postId, onReplyPress}) => {
  const {mutate: mutateCreateCommentLike} = useCreateLikeCommentPost();
  const {mutate: mutateRemoveCommentLike} = useRemoveLikeCommentPost();
  const queryClient = useQueryClient();
  const onLikePress = () => {
    if (item?.isLiked) removeCommentLike();
    else
      mutateCreateCommentLike(
        {input: {commentId: item?.id}, postId},
        {
          onSuccess(data, variables, context) {
            console.log(data);
            queryClient.invalidateQueries(['getPostComments']);
          },
        },
      );
  };
  const removeCommentLike = () => {
    mutateRemoveCommentLike(
      {input: {commentId: item?.id}, postId},
      {
        onSuccess(data, variables, context) {
          console.log(data);
          queryClient.invalidateQueries(['getPostComments']);
        },
      },
    );
  };

  return (
    <View style={[styles.container, {marginHorizontal: 44, marginTop: 8}]}>
      <TouchableOpacity onPress={onLikePress} disabled={item?.notPosted}>
        <HStack
          style={[styles.container, {alignItems: 'center'}]}
          space="4px"
          marginRight="16px">
          <HeartIconSet
            fill={item?.isLiked ? getColor({color: 'error.500'}) : undefined}
            width={16}
            height={16}
            color={
              item?.isLiked
                ? getColor({color: 'error.500'})
                : getColor({color: 'gray.500'})
            }
          />
          <Typography style={styles.optionText} color="gray.500">
            Like
          </Typography>
        </HStack>
      </TouchableOpacity>
      <TouchableOpacity onPress={onReplyPress} disabled={item?.notPosted}>
        <HStack style={[styles.container, {alignItems: 'center'}]} space="4px">
          <RedoIconSet width={16} height={16} color="secondary.500" />
          <Typography fontWeight="400" fontSize="sm" color="secondary.500">
            Reply
          </Typography>
        </HStack>
      </TouchableOpacity>
    </View>
  );
};
export default memo(CommentOptions);

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  optionText: {
    fontSize: 14,
    fontWeight: '400',
    color: getColor({color: 'secondary.500'}),
  },
});
