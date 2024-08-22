import React, {memo, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Image from '~/components/atoms/Image';
import {
  HStack,
  HeartIconSet,
  RedoIconSet,
  Typography,
  VStack,
  getColor,
  relativeTimeFromNow,
} from '~/components/elemental';
import {deviceWidth, scale} from '~/utils/methods';
import {useCreateLikeCommentPost, useRemoveLikeCommentPost} from './hook';
import {useQueryClient} from 'react-query';
import CommentOptions from './CommentOptions';
const ReplyItem = ({item, postId, onReplyPress}) => {
  const dateText = useMemo(() => {
    return relativeTimeFromNow(item?.createdDate);
  }, [item]);
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
  const fw = useMemo(() => {
    const text = item?.text;
    const wordsWithNewLine = text ? text.split(/\n/) : [];
    const finalWords: string[] = [];
    wordsWithNewLine.forEach((word: string, index: number) => {
      const newlineArray = word.split(/\s+/);
      if (newlineArray.length > 1) {
        newlineArray.forEach(newWord => {
          finalWords.push(newWord);
        });
      } else {
        finalWords.push(word);
      }
      if (index != wordsWithNewLine.length - 1) {
        finalWords.push('\n');
      }
    });
    return finalWords;
  }, [item]);
  const isClickable = (word: string) => {
    let isUser = word.charAt(0) === '@';
    if (isUser) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <View style={{marginHorizontal: 40}}>
      <View style={styles.container}>
        <Image style={styles.avatar} src={item?.user?.photoUrl} />
        <View style={styles.textContainer}>
          <Typography style={styles.nameText} color="primary.700">
            {item?.user?.fullName}
            <Typography style={styles.dateText} color="gray.500">
              {`  ${dateText}`}
            </Typography>
          </Typography>
          <Typography fontWeight="400" mt="8px">
            {fw.map((word: string, index: number) =>
              isClickable(word) ? (
                <Typography key={`indexClickable${index}`} color="primary.500">
                  {`${word} `}
                </Typography>
              ) : (
                <Typography
                  key={`indexNotClickable${index}`}>{`${word} `}</Typography>
              ),
            )}
            {item?.notPosted && (
              <Typography fontSize="xs" color="error.500">
                Sending...
              </Typography>
            )}
          </Typography>
        </View>
      </View>
      <CommentOptions {...{item, postId, onReplyPress}} />
    </View>
  );
};
export default memo(ReplyItem);
const styles = StyleSheet.create({
  avatar: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(30) / 2,
    marginEnd: 8,
  },
  container: {flexDirection: 'row'},
  textContainer: {
    borderRadius: 16,
  },
  nameText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 19,
    // color: 'primary.700',
  },
  dateText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 19,
    // color: 'gray.500',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '400',
  },
});
