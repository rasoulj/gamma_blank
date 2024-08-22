import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  HStack,
  Image,
  Typography,
  getColor,
  Rating,
  relativeTimeFromNow,
  useNavigate,
  User2Icon,
  ReportIcon,
  isDark,
  LikeIconSet,
  ScrollView,
} from '../../../elemental';
import {useCreateLikeReview, useRemoveLikeReview} from '../hook';
import ReportListModal from './Modals/ReportListModal';
import {useQueryClient} from 'react-query';
import {getTextColor} from '~/theme';
import {isArray} from 'lodash';

const ReviewItem = ({item, productId}: {item: any; productId: Number}) => {
  const {navigateWithName} = useNavigate();
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const {mutate: mutateCreateLike, isLoading: isLoadingCreateLike} =
    useCreateLikeReview();
  const {mutate: mutateRemoveLike, isLoading: isLoadingRemoveLike} =
    useRemoveLikeReview();
  const likeReviewHandler = () => {
    if (!item?.isLikedByCurrentUser) {
      mutateCreateLike(
        {reviewId: item?.review?.id},
        {
          onSuccess(data: any, variables, context) {
            queryClient.invalidateQueries(['getProductRatings']);
          },
        },
      );
    } else {
      mutateRemoveLike(
        {reviewId: item?.review?.id},
        {
          onSuccess(data: any, variables, context) {
            queryClient.invalidateQueries(['getProductRatings']);
          },
        },
      );
    }
  };

  return (
    <HStack style={styles.container}>
      <TouchableOpacity style={styles.userImageContainer}>
        {item?.review?.user?.photoUrl ? (
          <Image src={item?.review?.user?.photoUrl} style={styles.userImage} />
        ) : (
          <User2Icon width={38} height={38} />
        )}
      </TouchableOpacity>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewContentContainer}>
          <HStack style={styles.reviewHeader}>
            <Typography style={styles.userName}>
              {item?.review?.user?.fullName}
              {'  '}
              <Typography style={styles.relativeTime}>
                {relativeTimeFromNow(item?.review?.createdDate)}
              </Typography>
            </Typography>
            <HStack style={styles.ratingContainer}>
              <Rating rating={item?.rateByReviewCreator || 0} type={'numberic'} />
            </HStack>
          </HStack>
          {item?.review?.title && (
            <Typography style={styles.reviewTitle}>
              {item?.review?.title}
            </Typography>
          )}
          <Typography style={styles.reviewText}>
            {item?.review?.review}
          </Typography>
          {item?.review?.attachments && (
            <ScrollView horizontal style={styles.attachmentsContainer}>
              {isArray(JSON.parse(String(item?.review?.attachments))) &&
                JSON.parse(String(item?.review?.attachments)).map(
                  (item, index) => (
                    <Image
                      key={index}
                      src={item}
                      style={styles.attachmentImage}
                    />
                  ),
                )}
            </ScrollView>
          )}
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => setIsReportModalVisible(true)}>
            <ReportIcon width={16} color={isDark() ? '#fff' : '#222'} />
            <Typography style={styles.reportText}>Report</Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={likeReviewHandler}>
            <LikeIconSet
              fill={
                item?.isLikedByCurrentUser
                  ? getColor({color: 'secondary.500'})
                  : ''
              }
              width={16}
              color={
                isDark()
                  ? '#fff'
                  : item?.isLikedByCurrentUser
                  ? getColor({color: 'background.500'})
                  : '#222'
              }
            />
            {isLoadingCreateLike || isLoadingRemoveLike ? (
              <ActivityIndicator
                size={'small'}
                style={styles.likeActivityIndicator}
              />
            ) : (
              <Typography
                color={
                  item?.isLikedByCurrentUser
                    ? getColor({color: 'secondary.500'})
                    : getTextColor(getColor({color: 'background.500'}))
                }
                style={styles.likesCountText}>
                {item?.review?.likesCount} Helpful
              </Typography>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <ReportListModal
        entityName="product-comment"
        item={item}
        parentId={productId}
        isVisible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
      />
    </HStack>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 1,
    marginVertical: 3,
    flexDirection: 'row',
  },
  userImageContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
    marginRight: 8,
  },
  userImage: {
    alignSelf: 'flex-end',
    borderRadius: 100,
    width: 42,
    height: 42,
  },
  reviewContainer: {
    flex: 1,
  },
  reviewContentContainer: {
    flex: 1,
    backgroundColor: '#2222',
    borderRadius: 16,
    padding: 16,
    paddingTop: 8,
  },
  reviewHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    flex: 1,
    fontWeight: '700',
    fontSize: 14,
    color: getColor({color: 'primary.500'}),
  },
  relativeTime: {
    fontWeight: '400',
    fontSize: 12,
    color: getColor({color: 'gray.500'}),
  },
  ratingContainer: {},
  reviewTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  reviewText: {
    fontSize: 14,
    fontWeight: '400',
  },
  attachmentsContainer: {
    marginTop: 8,
  },
  attachmentImage: {
    marginTop: 8,
    borderRadius: 5,
    width: 50,
    height: 50,
    marginRight: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportText: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 5,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  likeActivityIndicator: {
    marginLeft: 5,
  },
  likesCountText: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 5,
  },
});
