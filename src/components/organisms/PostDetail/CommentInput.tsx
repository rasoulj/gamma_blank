import {
  ActivityIndicator,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  getColor,
  isDark,
  KeyboardAvoidingView,
  Typography,
  CloseIcon,
  Layer,
  VStack,
} from '~/components/elemental';
import {useQueryClient} from 'react-query';
import {useCreateCommentPost} from './hook';
import {SendBoldIcon, UndoIcon} from '~/assets';
import {useAnswerQuestion, useCreateReviewEducation} from '../CourseList/hook';
import {isElementInModel} from '~/utils/helper/isElementsInModel';

const CommentInput = ({
  replyTo,
  setReplyTo,
  postId,
  targetName,
  placeholder = 'Add a Comment',
  offsetHeight,
}) => {
  const queryClient = useQueryClient();

  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>();

  useEffect(() => {
    if (replyTo) {
      inputRef.current?.focus();
      inputRef.current?.setNativeProps({
        text: isElementInModel('SocialHome')
          ? `@${replyTo?.user?.fullName} `
          : ``,
      });
    }
  }, [replyTo]);

  const {mutate: mutateCreateComment, isLoading: isCommentSendLoading} =
    useCreateCommentPost();

  const {mutate: EducationReviewMutate, isLoading: isLoadingReviewEducation} =
    useCreateReviewEducation();

  const {mutate: AnswerQuestionMutate, isLoading: answerLoading} =
    useAnswerQuestion();

  const onSuccessCreateComment = async (variables: any, id: number) => {
    const previousComment = queryClient.getQueriesData('getPostComments');
    const key = previousComment?.[0]?.[0];

    await queryClient.cancelQueries(key);

    const previousPostCommentsData = queryClient.getQueryData(key);
    let oldPostCommentsData = previousPostCommentsData;

    if (oldPostCommentsData?.pages?.length > 0) {
      if (!variables?.commentInput?.parentId) {
        const commentsDataChecked = oldPostCommentsData?.pages?.map(
          (item: any) => {
            let temp = Object.assign({}, item);
            const items = item?.postComment_getPostComments?.result?.items.map(
              (el: any) => {
                if (el?.id === variables?.id) {
                  let comment = {...el};
                  comment.id = id;
                  comment.createdDate = new Date().toUTCString();
                  return {
                    ...comment,
                    notPosted: false,
                  };
                } else {
                  return el;
                }
              },
            );
            temp.postComment_getPostComments.result.items = items;
            return temp;
          },
        );
        oldPostCommentsData.pages = commentsDataChecked;
      } else {
        const commentsDataChecked = oldPostCommentsData?.pages?.map(
          (item: any) => {
            let temp = Object.assign({}, item);
            const items = item?.postComment_getPostComments?.result?.items.map(
              (el: any) => {
                let child = el?.children;
                for (let i = 0; i < child?.length; i++) {
                  let currentChild = child?.[i];
                  if (currentChild?.id === variables?.id) {
                    let comment = {...currentChild};
                    comment.id = id;
                    comment.createdDate = new Date().toUTCString();
                    child[i] = {
                      ...comment,
                      notPosted: false,
                    };
                    break;
                  }
                }
                el.children = child;
                return el;
              },
            );
            temp.postComment_getPostComments.result.items = items;
            return temp;
          },
        );
        oldPostCommentsData.pages = commentsDataChecked;
      }
    }

    queryClient.setQueriesData(key, oldPostCommentsData);
  };
  const sendComment = () => {
    let itemInput = {
      postId,
      parentId: replyTo ? replyTo?.id || replyTo?.review?.id : null,
      text,
    };

    setReplyTo(undefined);
    inputRef.current?.clear();
    if (targetName === 'course') {
      EducationReviewMutate(
        {
          input: {
            courseId: postId,
            review: text,
            parentId: replyTo ? replyTo?.id || replyTo?.review?.id : null,
          },
        },
        {
          onSuccess(data) {
            if (data?.course_createReview?.status?.value === 'Success') {
              queryClient.invalidateQueries(['getCourseReviews']);
              setReplyTo(null);
            }
          },
        },
      );
    } else if (targetName === 'question') {
      AnswerQuestionMutate(
        {
          lessonQuestionId: postId,
          answer: text,
        },
        {
          onSuccess(data) {
            if (
              data?.course_answerToTopicQuestion?.status?.value === 'Success'
            ) {
              queryClient.invalidateQueries('getCourses');
              setReplyTo(null);
            }
          },
        },
      );
    } else {
      mutateCreateComment(
        {commentInput: itemInput, id: Math.floor(Math.random() * 100000 + 1)},
        {
          onSuccess: (success, variables) => {
            Keyboard.dismiss();
            if (success?.postComment_createComment?.status?.code === 1) {
              inputRef.current?.clear();
              queryClient.refetchQueries(['getPostComments']);
              queryClient.refetchQueries(['getPosts'], {exact: false});
              queryClient.refetchQueries(['post_getUserAndFollowingPosts'], {
                exact: false,
              });
              onSuccessCreateComment(
                variables,
                success?.postComment_createComment?.result?.id,
              );
              setReplyTo(null);
            }
          },
        },
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={offsetHeight ?? 120}
      style={replyTo ? styles.containerReply : styles.container}>
      {replyTo && (
        <Layer style={styles.replyContainer}>
          <UndoIcon />
          <VStack flex={1}>
            <Typography style={styles.replyText} color={'secondary.500'}>
              {replyTo?.user?.fullName ?? replyTo?.review?.user?.fullName}
            </Typography>
            <Typography style={styles.commentText} color={'secondary.500'}>
              {replyTo?.review?.review?.length > 100 ||
              replyTo?.review?.length > 100 ||
              replyTo?.question?.length > 100
                ? (replyTo?.review?.review).substring(0, 100 - 3) ||
                  (replyTo?.review).substring(0, 100 - 3) ||
                  (replyTo?.question).substring(0, 100 - 3) + '...'
                : replyTo?.review?.review ??
                  replyTo?.review ??
                  replyTo?.question}
            </Typography>
          </VStack>
          <TouchableOpacity
            style={styles.closeTouchable}
            onPress={() => setReplyTo(undefined)}>
            <CloseIcon width={12} height={12} />
          </TouchableOpacity>
        </Layer>
      )}
      <Layer style={styles.bottomInput}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            numberOfLines={1}
            placeholder={placeholder}
            keyboardType="default"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.sendTouchable} onPress={sendComment}>
          {answerLoading || isCommentSendLoading || isLoadingReviewEducation ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <SendBoldIcon
              color={getColor({
                color: isDark('primary') ? 'gray.50' : 'gray.800',
              })}
            />
          )}
        </TouchableOpacity>
      </Layer>
    </KeyboardAvoidingView>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 14,
    color: getColor({color: 'gray.800'}),
  },

  inputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderColor: getColor({color: 'gray.400'}),
    flex: 1,
  },

  replyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: getColor({color: 'primary.100'}),
    borderRadius: 8,
    padding: 8,
  },

  replyText: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },

  bottomInput: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  sendTouchable: {
    width: 50,
    height: 50,
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  closeTouchable: {paddingRight: 10},
  commentText: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '400',
  },

  container: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 24,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: getColor({color: 'background.500'}),
  },

  containerReply: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 24,
    left: 0,
    right: 0,
    backgroundColor: getColor({color: 'background.200'}),
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
