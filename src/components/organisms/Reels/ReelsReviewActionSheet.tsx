import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {FlatList, LoadIndicator, deviceHeight} from '~/components/elemental';
import {useGetPostComments} from './hooks';
import {Box} from 'native-base';
import {SocialCommentInput, SocialCommentItem} from '~/components';

const ReelsReviewActionSheet = ({
  isVisible,
  onClose,
  postId,
}: {
  isVisible: boolean;
  onClose: () => void;
  postId: number;
}) => {
  const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage} =
    useGetPostComments({
      postId,
      where: {
        parentId: {
          eq: null,
        },
      },
      order: [{createdDate: 'DESC'}],
    });
  const [replyTo, setReplyTo] = useState(undefined);

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <SocialCommentItem
          item={item}
          postId={postId}
          onReplyPress={setReplyTo}
          containerStyle={{marginHorizontal: 0}}
        />
      );
    },
    [],
  );

  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose} title="Comments">
      <View style={styles.container}>
        {isLoading && <LoadIndicator />}
        <FlatList
          data={data?.pages}
          setEmptyComponent
          isLoading={isLoading}
          renderItem={renderItem}
          onEndReached={onLoadMore}
          isFetchingNextPage={isFetchingNextPage}
          ItemSeparatorComponent={() => <Box h="16px" />}
          ListFooterComponent={() => <Box h="116px" />}
        />
      </View>
      <SocialCommentInput
        {...{
          replyTo,
          setReplyTo,
          postId,
          offsetHeight: 0,
        }}
      />
    </CustomActionSheet>
  );
};
export default ReelsReviewActionSheet;

const styles = StyleSheet.create({
  container: {minHeight: '50%', maxHeight: deviceHeight * 0.8},
});
