import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  IMG,
  Typography,
  getColor,
  HeartIcon,
  ReplyIcon,
  relativeTimeFromNow,
  Layer,
  isDark,
  User2Icon,
} from '../../../elemental';
import {useCreateLikeCommentPost, useRemoveLikeCommentPost} from '../hook';
import {useQueryClient} from 'react-query';
import {
  useCreateLikeReviewEducation,
  useRemoveLikeReviewEducation,
  useReviewIsLiked,
} from '../../CourseList/hook';

const PostCommentReplyedItem = ({
  item,
  parentId,
  setReplyTo,
  postId,
  targetName,
  style,
}: {
  item: any;
  parentId: any;
  setReplyTo?: (item) => void;
  postId: any;
  targetName;
  style?: ViewStyle;
}) => {
  const queryClient = useQueryClient();

  const [isLiked, setIsLike] = useState(false);

  const {mutate: mutateCreateCommentLike} = useCreateLikeCommentPost(postId);
  const {mutate: mutateRemoveCommentLike} = useRemoveLikeCommentPost(postId);
  const {mutate: mutateRemoveLikeReview} = useRemoveLikeReviewEducation();
  const {mutate: mutateLikeReview} = useCreateLikeReviewEducation();

  const {mutate: isLikeMutate} = useReviewIsLiked();

  useEffect(() => {
    isLikeMutate(
      {reviewIds: [item.id]},
      {
        onSuccess(data) {
          if (data?.course_reviewIsLiked?.result[0]?.value) {
            setIsLike(true);
          } else {
            setIsLike(false);
          }
        },
      },
    );
  }, [isLiked]);

  const createCommentLike = () => {
    switch (targetName) {
      case 'course':
        mutateLikeReview(
          {reviewId: item?.id},
          {
            onSuccess() {
              setIsLike(true);
              queryClient.invalidateQueries(['getCourseReviews']);
            },
          },
        );
        break;
      default:
        mutateCreateCommentLike(
          {commentId: postId},
          {
            onSuccess() {
              setIsLike(true);
              queryClient.invalidateQueries(['getPostComments']);
            },
          },
        );
        break;
    }
  };

  const removeCommentLike = () => {
    switch (targetName) {
      case 'course':
        mutateRemoveLikeReview(
          {reviewId: item?.id},
          {
            onSuccess() {
              setIsLike(false);
              queryClient.invalidateQueries(['getCourseReviews']);
            },
          },
        );
        break;
      default:
        mutateRemoveCommentLike(
          {commentId: item?.id},
          {
            onSuccess() {
              setIsLike(false);
              queryClient.invalidateQueries(['getPostComments']);
            },
          },
        );
        break;
    }
  };
  return (
    <>
      <Layer style={[styles.container, style]}>
        {item?.user?.photoUrl ? (
          <IMG style={styles.img} source={{uri: item?.user?.photoUrl}} />
        ) : (
          <User2Icon width={38} height={38} />
        )}
        <Layer style={styles.flexGrow}>
          <Layer style={styles.stack}>
            <Layer style={styles.row}>
              <Typography color="secondary.500" style={styles.userName}>
                {item?.user?.fullName}
              </Typography>
              <Typography
                alignSelf="flex-end"
                color="gray.500"
                style={styles.time}>
                {relativeTimeFromNow(item?.createdDate)}
              </Typography>
            </Layer>
            <Typography
              color={isDark() ? 'gray.50' : 'gray.800'}
              style={styles.reviewTxt}>
              {item?.text ?? item?.review}
            </Typography>
          </Layer>
          <Layer style={styles.rowContainer}>
            <HeartIcon
              onPress={() =>
                item?.isLiked || isLiked
                  ? removeCommentLike()
                  : createCommentLike()
              }
              width={16}
              height={16}
              isLiked={item?.isLiked || isLiked}
              color={getColor({
                color: item?.isLiked || isLiked ? 'error.500' : 'gray.500',
              })}
            />
            <Typography color="gray.500" style={styles.text}>
              {item?.likeCount > 0 ? item?.likeCount : ''}{' '}
              {item?.likeCount > 1 ? 'Likes' : 'Like'}
            </Typography>
            <TouchableOpacity
              onPress={() => {
                setReplyTo({...item, id: parentId});
              }}
              style={styles.rowView}>
              <ReplyIcon style={styles.marginLeft} />
              <Typography color="secondary.500" style={styles.text}>
                Reply
              </Typography>
            </TouchableOpacity>
          </Layer>
        </Layer>
      </Layer>
    </>
  );
};

export default PostCommentReplyedItem;

const styles = StyleSheet.create({
  text: {marginLeft: 4, fontSize: 14, fontWeight: '400'},
  rowView: {flexDirection: 'row', alignItems: 'center'},
  marginLeft: {marginLeft: 10},
  rowContainer: {flexDirection: 'row', marginTop: 8, alignItems: 'center'},
  reviewTxt: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 8,
  },
  time: {fontSize: 12, fontWeight: '400'},
  userName: {marginRight: 8, fontSize: 14, fontWeight: '700', marginLeft: 5},
  stack: {
    flexGrow: 1,
    borderRadius: 16,
    paddingHorizontal: 0,
  },
  row: {flexDirection: 'row'},
  flexGrow: {flexShrink: 1},
  img: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: 'gray',
    alignSelf: 'flex-start',
    marginRight: 8,
    marginBottom: 24,
  },
  container: {flexDirection: 'row', paddingVertical: 8, marginLeft: 30},
});
