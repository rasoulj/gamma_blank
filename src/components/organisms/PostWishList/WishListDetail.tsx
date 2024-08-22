import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useRoute,
  LoadIndicator,
  HStack,
  Button,
  useToast,
  useNavigate,
  EmptyData,
} from '~/components';
import {
  useAddToWishlistMutation,
  useGetPostWishLists,
  useRemoveFromAllWishlistMutation,
  useRemovePostFromWishlistMutation,
} from './hooks';
import MasonryList from '@react-native-seoul/masonry-list';
import useHeader from '~/components/elemental/hooks/use_header';
import WishlistItem from './SelectedWishItem';
import {useQueryClient} from 'react-query';
import WishListBoardModal from '../WishList/WishlistHome/Modals/WishlistBoardModal';

const WishListDetail = () => {
  const params = useRoute().params;
  const isMainBoard = params?.isMainBoard;
  const isSelectEnable = params?.selectable;
  const boardId = params?.WishlistId;
  const isAddToBorad = params?.isAddToBorad;
  const wishlistItem = params?.item;
  const [visibleBoards, setVisibleBoards] = useState(false);

  const onCloseAddBoards = () => setVisibleBoards(false);
  const onPressAddToBoard = () => {
    if (isAddToBorad) {
      onAddPress();
    } else {
      if (selectedItems.current?.length === 0) {
        toast({message: 'Select at least one item', type: 'error'});
        return;
      }
      setVisibleBoards(true);
    }
  };

  const {} = useHeader({
    title: {
      children: wishlistItem?.wishList?.name
        ? wishlistItem?.wishList?.name?.camelize()
        : 'Saved',
      fontSize: 'lg',
      fontWeight: 'bold',
    },
  });
  const {toast} = useToast();
  const {navigation} = useNavigate();

  const {data, isLoading, hasNextPage, fetchNextPage, refetch} =
    useGetPostWishLists({
      where: isAddToBorad
        ? {
            and: [
              {
                wishLists: {none: {id: {eq: boardId}}},
              },
              {isInWishList: {eq: true}},
            ],
          }
        : {wishLists: {some: {id: {eq: boardId}}}},
    });
  const flatListData = data?.pages ?? [];

  const selectedItems = useRef<any>([]);

  const renderItem = useCallback(({item, i: index}) => {
    return (
      <WishlistItem
        {...{item, index, selectedItems, isSelected: isSelectEnable}}
      />
    );
  }, []);

  const queryClient = useQueryClient();
  const {mutate: unsaveMutate, isLoading: unsaveLoading} =
    useRemovePostFromWishlistMutation();
  const {mutate: allUnsaveMutate, isLoading: allUnsaveLoading} =
    useRemoveFromAllWishlistMutation();
  const onUnSavePress = () => {
    if (selectedItems.current?.length === 0) {
      toast({message: 'Select at least one item', type: 'error'});
      return;
    }
    if (isMainBoard)
      allUnsaveMutate(
        {entityIdList: selectedItems.current},
        {
          onSuccess: data => {
            if (data?.wishList_removeFromAllWishLists?.code === 1) {
              toast({message: 'Success', type: 'success'});
              queryClient.invalidateQueries(['post_getWishLists'], {
                exact: false,
              });
              selectedItems.current = [];
              navigation.goBack();
            } else
              toast({
                message: data?.wishList_removeFromAllWishLists?.value,
                type: 'error',
              });
          },
        },
      );
    else
      unsaveMutate(
        {entityIdList: selectedItems.current, wishListId: boardId},
        {
          onSuccess: data => {
            if (
              data?.wishList_removeFromWishList?.find(item => item?.code === 1)
            ) {
              toast({message: 'Success', type: 'success'});
              queryClient.invalidateQueries(['post_getWishLists'], {
                exact: false,
              });
              queryClient.refetchQueries(['getWishLists']);
              queryClient.invalidateQueries(['getPosts'], {exact: false});
              queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
                exact: false,
              });
              queryClient.invalidateQueries(['getWishListPosts'], {
                exact: false,
              });
              selectedItems.current = [];
              navigation.goBack();
            } else
              toast({
                message: data?.wishList_removeFromWishList?.value,
                type: 'error',
              });
          },
        },
      );
  };

  const {mutate: addMutate, isLoading: addLoading} = useAddToWishlistMutation();

  const onAddPress = () => {
    if (selectedItems.current?.length === 0) {
      toast({message: 'Select at least one item', type: 'error'});
      return;
    }
    addMutate(
      {wishListId: boardId, entityIdList: selectedItems?.current},
      {
        onSuccess: () => {
          queryClient.refetchQueries(['getWishLists']);
          queryClient.invalidateQueries(['getPosts'], {exact: false});
          queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
            exact: false,
          });
          queryClient.invalidateQueries(['getWishListPosts'], {exact: false});
          navigation.goBack();
          toast({message: 'Added', type: 'success'});
        },
      },
    );
  };

  const onEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <>
      <View style={styles.flex1}>
        {isLoading && <LoadIndicator />}
        <MasonryList
          renderItem={renderItem}
          numColumns={2}
          data={flatListData}
          keyExtractor={(item, index) => `${item?.post?.id}`}
          onEndReached={onEndReached}
          ListEmptyComponent={isLoading ? undefined : <EmptyData />}
        />
        {isSelectEnable && flatListData?.length > 0 && (
          <HStack justifyContent="space-between" space="4">
            <Button
              variant="outline"
              flex="1"
              onPress={onUnSavePress}
              isLoading={unsaveLoading || allUnsaveLoading}>
              Unsave
            </Button>
            <Button flex="2" onPress={onPressAddToBoard} isLoading={addLoading}>
              {isAddToBorad ? 'Add' : 'Add to board'}
            </Button>
          </HStack>
        )}
      </View>
      {visibleBoards && (
        <WishListBoardModal
          isVisible={visibleBoards}
          onClose={onCloseAddBoards}
          item={undefined}
          ids={selectedItems.current}
          entityName={'post'}
        />
      )}
    </>
  );
};

export default WishListDetail;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
