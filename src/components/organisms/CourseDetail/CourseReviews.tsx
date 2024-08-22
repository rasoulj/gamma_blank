import React, {Fragment, memo, useCallback, useState} from 'react';

import {
  Button,
  HStack,
  PlusIcon,
  RateReview,
  Typography,
  getColor,
} from '~/components/elemental';
import PostCommentItem from '../Post/PostComment/PostCommentItem';
import {Tabs} from 'react-native-collapsible-tab-view';
import styles from './styles';
import ReviewDetails from './ReviewDetails';
import CommentInput from '../PostDetail/CommentInput';
import useAuthStore from '~/stores/authStore';

const CourseReviews = ({
  data,
  isEnrolled,
  onLoadMore,
  hasNextPage,
  courseId,
  rateData,
}) => {
  const user = useAuthStore(state => state?.user);

  const [reviewVisible, setReviewVisible] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [selected, setSelected] = useState(null);

  const renderItem = useCallback(({item}) => {
    return (
      <PostCommentItem
        postId={item?.review?.id}
        item={item}
        setReplyTo={setReplyTo}
        selected={selected}
        setSelected={setSelected}
        targetName="course"
        canReply={isEnrolled}
      />
    );
  }, []);

  const listHeaderComponent = () => {
    return (
      <Fragment>
        <ReviewDetails data={rateData} />
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          mt="5.5"
          mb="4">
          <Typography fontSize="4" fontWeight={'700'} lineHeight={22}>
            Reviews
          </Typography>
          {isEnrolled && user?.userRole !== 'educator' && (
            <Button
              style={styles.btn}
              onPress={() => setReviewVisible(true)}
              leftIcon={<PlusIcon color={getColor({color: 'primary.500'})} />}
              variant={'outline'}
              iconStyle={styles.mr}>
              <Typography
                ml="2"
                color={getColor({color: 'primary.500'})}
                fontSize="3.5"
                lineHeight={16}
                fontWeight={'700'}>
                Write a Review
              </Typography>
            </Button>
          )}
        </HStack>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Tabs.FlatList
        data={data}
        contentContainerStyle={styles.TabStyle}
        ListHeaderComponent={listHeaderComponent}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (hasNextPage) {
            onLoadMore?.();
          }
        }}
      />
      <RateReview
        id={data[0]?.review?.courseId ?? courseId}
        targetName="course"
        itemName={'this course'}
        isOpen={reviewVisible}
        onClose={() => setReviewVisible(false)}
        hasReview={true}
        hasTitle={true}
        hasRate={true}
      />
      {replyTo && (
        <CommentInput
          postId={data[0]?.review?.courseId ?? courseId}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          targetName={'course'}
        />
      )}
    </Fragment>
  );
};
export default memo(CourseReviews);
