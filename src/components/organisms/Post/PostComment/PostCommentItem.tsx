import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import Layer from '../../../atoms/Layer';
import {
  IMG,
  Typography,
  getColor,
  HeartIcon,
  ReplyIcon,
  relativeTimeFromNow,
  useNavigate,
  isDark,
  User2Icon,
  VStack,
} from '../../../elemental';
import PostCommentReplyedItem from './PostCommentReplyedItem';
import {useCreateLikeCommentPost, useRemoveLikeCommentPost} from '../hook';
import {useQueryClient} from 'react-query';
import {
  useCreateLikeReviewEducation,
  useRemoveLikeReviewEducation,
} from '../../CourseList/hook';

const PostCommentItem = ({
  item,
  setReplyTo,
  selected,
  setSelected,
  postId,
  targetName,
  canReply,
}: {
  item: any;
  setReplyTo?: (item) => void;
  selected: any;
  setSelected: (item) => void;
  postId: any;
  targetName?: string;
  canReply?: boolean;
}) => {
  const queryClient = useQueryClient();
  const {navigateWithName} = useNavigate();

  const {mutate: mutateCreateCommentLike} = useCreateLikeCommentPost(postId);
  const {mutate: mutateRemoveCommentLike} = useRemoveLikeCommentPost(postId);
  const {mutate: mutateLikeReview} = useCreateLikeReviewEducation();
  const {mutate: mutateRemoveLikeReview} = useRemoveLikeReviewEducation();

  const createCommentLike = () => {
    switch (targetName) {
      case 'course':
        mutateLikeReview(
          {reviewId: postId},
          {
            onSuccess() {
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
          {reviewId: postId},
          {
            onSuccess() {
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
              queryClient.invalidateQueries(['getPostComments']);
            },
          },
        );
        break;
    }
  };

  return (
    <Fragment>
      <TouchableOpacity
        onLongPress={() => setSelected(item)}
        style={[
          styles.row,
          {
            backgroundColor:
              selected?.review?.id === item?.review?.id ??
              selected?.id === item?.id
                ? getColor({color: 'background.500'})
                : null,
          },
        ]}>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() =>
            navigateWithName('profile', {
              item: item?.user ?? item?.review?.user,
            })
          }>
          {item?.user?.photoUrl || item?.review?.user?.photoUrl ? (
            <IMG
              style={styles.image}
              source={{
                uri: item?.user?.photoUrl ?? item?.review?.user?.photoUrl,
              }}
            />
          ) : (
            <User2Icon width={38} height={38} />
          )}
        </TouchableOpacity>
        <VStack style={styles.flexGrow}>
          <Layer style={styles.content}>
            <Layer style={styles.rowView}>
              <Typography color="primary.500" style={styles.boldText}>
                {item?.user?.fullName ||
                  item?.user?.email ||
                  item?.review?.user?.fullName ||
                  item?.review?.user?.email}
              </Typography>
              <Typography
                alignSelf="flex-end"
                color="gray.500"
                style={styles.time}>
                {relativeTimeFromNow(
                  item?.createdDate ?? item?.review?.createdDate,
                )}
              </Typography>
            </Layer>
            <Typography
              color={isDark() ? 'gray.50' : 'gray.800'}
              style={styles.text}>
              {item?.text ?? item?.review?.review}
            </Typography>
          </Layer>
          {canReply && (
            <Layer style={styles.btnContainer}>
              <HeartIcon
                onPress={() =>
                  item?.isLiked || item?.isLikedByCurrentUser
                    ? removeCommentLike()
                    : createCommentLike()
                }
                width={16}
                height={16}
                isLiked={item?.isLiked ?? item?.isLikedByCurrentUser}
                color={getColor({
                  color: item?.isLikedByCurrentUser ? 'error.500' : 'gray.500',
                })}
              />
              <Typography color="gray.500" style={styles.text}>
                {item?.likeCount > 0 || item?.review?.likeCount > 0
                  ? item?.likeCount
                  : ''}{' '}
                {item?.likeCount > 1 || item?.review?.likeCount > 1
                  ? 'Likes'
                  : 'Like'}
              </Typography>
              <TouchableOpacity
                onPress={() => {
                  setReplyTo(item);
                }}
                style={styles.centerRow}>
                <ReplyIcon style={styles.margin} />
                <Typography color="secondary.500" style={styles.text}>
                  Reply
                </Typography>
              </TouchableOpacity>
            </Layer>
          )}
        </VStack>
      </TouchableOpacity>
      {item?.review?.children?.map(i => {
        return (
          <TouchableOpacity
            style={{
              backgroundColor:
                selected?.id === i?.id
                  ? getColor({color: 'primary.100'})
                  : null,
            }}
            onLongPress={() => setSelected(i)}>
            <PostCommentReplyedItem
              postId={postId}
              parentId={item?.id ?? item?.review?.id}
              targetName={targetName}
              item={i}
              setReplyTo={setReplyTo}
            />
          </TouchableOpacity>
        );
      })}
      {item?.children?.map(i => {
        return (
          <TouchableOpacity
            style={{
              backgroundColor:
                selected?.id === i?.id
                  ? getColor({color: 'primary.100'})
                  : null,
            }}
            onLongPress={() => setSelected(i)}>
            <PostCommentReplyedItem
              postId={postId}
              parentId={item?.id ?? item?.review?.id}
              item={i}
              targetName={targetName}
              setReplyTo={setReplyTo}
            />
          </TouchableOpacity>
        );
      })}
    </Fragment>
  );
};

export default PostCommentItem;

const styles = StyleSheet.create({
  row: {flexDirection: 'row', paddingVertical: 8},
  profileBtn: {alignSelf: 'flex-end', marginRight: 8, marginBottom: 28},
  image: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  flexGrow: {flexShrink: 1},
  content: {
    flex: 1,
    backgroundColor: getColor({color: 'background.700'}),
    borderRadius: 16,
    padding: 16,
  },
  rowView: {flexDirection: 'row'},
  text: {marginLeft: 4, fontSize: 14, fontWeight: '400'},
  centerRow: {flexDirection: 'row', alignItems: 'center'},
  margin: {marginLeft: 10},
  btnContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  boldText: {marginRight: 8, fontSize: 14, fontWeight: '700'},
  time: {fontSize: 12, fontWeight: '400'},
});
