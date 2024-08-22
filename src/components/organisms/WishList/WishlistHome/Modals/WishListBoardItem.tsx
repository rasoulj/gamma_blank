import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  AddIconSet,
  TickIconSet,
  Typography,
  getColor,
  useToast,
} from '~/components/elemental';
import {useQueryClient} from 'react-query';
import {
  useAddToWishList,
  useRemoveFromAllWishlistMutation,
  useRemoveFromWishList,
} from '../../hook';

const WishListBoarditem = ({
  item,
  ids,
  onClose,
}: {
  item: any;
  ids?: any;
  onClose?: () => void;
}) => {
  const queryClient = useQueryClient();
  const {toast} = useToast();

  const {mutate: mutateAddToWishList, isLoading: addLoading} =
    useAddToWishList();

  const addToWishList = wishListId => {
    mutateAddToWishList(
      {wishListId: wishListId, entityIdList: ids ? ids : [item?.product?.id]},
      {
        onSuccess(data) {
          queryClient.invalidateQueries(['getShoppingCards'], {exact: false});
          queryClient.refetchQueries(['getProducts']);
          queryClient.refetchQueries(['getWishLists']);
          queryClient.invalidateQueries(['getPosts'], {exact: false});
          queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
            exact: false,
          });
          queryClient.invalidateQueries(['post_getWishLists'], {exact: false});
          if (ids?.length > 1) {
            if (
              JSON.stringify({data}).includes('success') ||
              JSON.stringify({data}).includes('Already Exist')
            ) {
              toast({message: 'Success', type: 'success'});
            }
            onClose();
          }
        },
      },
    );
  };

  const {mutate: mutateRemoveFromWishlist, isLoading: removeLoading} =
    useRemoveFromWishList();
  const {mutate: mutateRemoveFromAllWishlist, isLoading: removeAllLoading} =
    useRemoveFromAllWishlistMutation();
  const removeFromWishlist = wishListId => {
    if (item?.wishList?.name === 'All Items')
      mutateRemoveFromAllWishlist(
        {
          entityName: item?.wishList?.entityName,
          entityIdList: ids ? ids : [item?.product?.id],
        },
        {
          onSuccess(data) {
            queryClient.invalidateQueries(['getShoppingCards']);
            queryClient.refetchQueries(['getProducts']);
            queryClient.invalidateQueries(['getWishLists'], {exact: false});
            queryClient.invalidateQueries(['getPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
              exact: false,
            });
            queryClient.invalidateQueries(['getWishListPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getWishLists'], {
              exact: false,
            });
            if (ids?.length > 1) {
              if (
                JSON.stringify({data}).includes('success') ||
                JSON.stringify({data}).includes('Already Exist')
              ) {
                toast({message: 'Success', type: 'success'});
              }
              onClose();
            }
          },
        },
      );
    else
      mutateRemoveFromWishlist(
        {wishListId: wishListId, entityIdList: ids ? ids : [item?.product?.id]},
        {
          onSuccess(data) {
            queryClient.invalidateQueries(['getShoppingCards']);
            queryClient.refetchQueries(['getProducts']);
            queryClient.invalidateQueries(['getWishLists'], {exact: false});
            queryClient.invalidateQueries(['getPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
              exact: false,
            });
            queryClient.invalidateQueries(['getWishListPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getWishLists'], {
              exact: false,
            });
          },
        },
      );
  };

  return (
    <View style={styles.container}>
      <Typography>{item?.wishList?.name}</Typography>
      <TouchableOpacity
        style={
          item?.isInWishList ? styles.touchableInWishlist : styles.touchable
        }
        onPress={() =>
          item?.isInWishList
            ? removeFromWishlist(item?.wishList?.id)
            : addToWishList(item?.wishList?.id)
        }>
        {addLoading || removeLoading || removeAllLoading ? (
          <ActivityIndicator />
        ) : item?.isInWishList ? (
          <TickIconSet color={getColor({color: 'background.500'})} />
        ) : (
          <AddIconSet color={getColor({color: 'primary.500'})} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default WishListBoarditem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: getColor({color: 'gray.300'}),
    borderBottomWidth: 1,
  },

  touchableInWishlist: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: getColor({color: 'primary.500'}),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: getColor({color: 'primary.500'}),
  },

  touchable: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: getColor({color: 'primary.500'}),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: getColor({color: 'background.500'}),
  },
});
