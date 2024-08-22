import React, {Fragment, memo, useCallback, useState} from 'react';
import {
  Button,
  HStack,
  PlusIcon,
  RateReview,
  Typography,
  getColor,
} from '~/components/elemental';
import ReviewItem from '../Content/ContentDetail/ReviewItem';
import ReviewDetails from '../CourseDetail/ReviewDetails';
import styles from './styles';
import {Tabs} from 'react-native-collapsible-tab-view';

const EducatorReviews = ({
  data,
  educatorId,
  onLoadMore,
  hasNextPage,
  educatorRate,
  rateReview,
}) => {
  const [reviewVisible, setReviewVisible] = useState(false);

  const renderItem = useCallback(({item}) => {
    return <ReviewItem item={item} />;
  }, []);

  const listHeaderComponent = () => {
    return (
      <Fragment>
        {rateReview && <ReviewDetails data={educatorRate} />}
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontSize="md" fontWeight={'700'} lineHeight={22}>
            Reviews
          </Typography>
          <Button
            onPress={() => setReviewVisible(true)}
            leftIcon={<PlusIcon color={getColor({color: 'primary.500'})} />}
            mt="2"
            mb="3"
            style={styles.btn}
            variant={'outline'}
            iconStyle={{marginRight: 8}}>
            <Typography
              ml="2"
              color={getColor({color: 'primary.500'})}
              fontSize="3.5"
              lineHeight={16}
              fontWeight={'700'}>
              Write a Review
            </Typography>
          </Button>
        </HStack>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Tabs.FlatList
        data={data}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.TabStyle}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (hasNextPage) {
            onLoadMore?.();
          }
        }}
      />
      <RateReview
        id={educatorId}
        targetName="educator"
        itemName={'this educator'}
        isOpen={reviewVisible}
        onClose={() => setReviewVisible(false)}
        hasReview={true}
        hasRate={true}
        hasTitle={false}
      />
    </Fragment>
  );
};
export default memo(EducatorReviews);
