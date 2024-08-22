import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  Box,
  FlatList,
  Typography,
  VStack,
  deviceHeight,
} from '~/components/elemental';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {useGetPostWishLists} from '../../hook';
import WishlistItem from './WishlistItem';
import CreateWishlistActionSheet from './CreateWishlistActionSheet';

const WishListActionSheet = ({
  isVisible,
  onClose,
  item,
  ignoreBoardId,
  postIds,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
  ignoreBoardId?: number;
  postIds?: number[];
}) => {
  const [isNewBoardVisible, setIsNewBoardVisible] = useState(false);
  const onPressNewBoard = () => {
    setIsNewBoardVisible(true);
  };
  const onCloseNewBoard = () => {
    setIsNewBoardVisible(false);
    onClose();
  };

  const where = ignoreBoardId
    ? {
        and: [
          {wishList: {id: {neq: ignoreBoardId}}},
          {wishList: {name: {neq: 'All Items'}}},
        ],
      }
    : undefined;
  const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage} =
    useGetPostWishLists({
      postId: item?.id,
      where,
      entityName: 'POST',
    });
  const renderItem = useCallback(({item: wishItem, index}) => {
    return (
      <WishlistItem
        {...{wishItem, postId: item?.id, onClose, postIds: postIds}}
      />
    );
  }, []);
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  if (isNewBoardVisible)
    return (
      <CreateWishlistActionSheet
        isVisible={isNewBoardVisible}
        onClose={onCloseNewBoard}
        postId={item?.id}
        postIds={postIds}
      />
    );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <VStack space={4} maxHeight={deviceHeight * 0.8}>
        <Typography
          fontWeight={'700'}
          fontSize="lg"
          color={'gray.800'}
          alignSelf="center">
          Add to
        </Typography>
        <TouchableOpacity onPress={onPressNewBoard}>
          <VStack
            borderWidth={2}
            borderColor="primary.500"
            h={12}
            w="100%"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            borderRadius={10}>
            <Typography
              fontWeight={'600'}
              fontSize="md"
              color="primary.500"
              alignSelf="center">
              Create New Board
            </Typography>
          </VStack>
        </TouchableOpacity>
        <FlatList
          data={data?.pages}
          renderItem={renderItem}
          isLoading={isLoading}
          onEndReached={onLoadMore}
          isFetchingNextPage={isFetchingNextPage}
          style={styles.marginTop}
          ItemSeparatorComponent={() => <Box h={5} />}
        />
      </VStack>
    </CustomActionSheet>
  );
};

export default WishListActionSheet;

const styles = StyleSheet.create({
  marginTop: {marginTop: 16},
});
