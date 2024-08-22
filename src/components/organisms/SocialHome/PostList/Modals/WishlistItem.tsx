import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {
  AddIconSet,
  HStack,
  Image,
  TickIconSet,
  Typography,
  VStack,
  getColor,
  scale,
  useToast,
} from '~/components/elemental';
import {
  useAddToWishlistMutation,
  useRemoveFromAllWishlistMutation,
  useRemoveFromWishlistMutation,
} from '../../hook';
import {ActivityIndicator} from 'react-native';
import {useQueryClient} from 'react-query';

const WishlistItem = ({
  wishItem,
  onClose,
  postId,
  postIds,
}: {
  wishItem: any;
  postId: number;
  onClose: () => void;
  postIds?: any[];
}) => {
  const {mutate, isLoading: addIsLoading} = useAddToWishlistMutation();
  const {mutate: removeMutate, isLoading: removeIsLoading} =
    useRemoveFromWishlistMutation();
  const {mutate: removeAllMutate, isLoading: removeAllLoading} =
    useRemoveFromAllWishlistMutation();
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const addOnPress = () => {
    if (wishItem?.postIsInWishList)
      if (wishItem?.wishList?.name === 'All Items') {
        removeAllMutate(
          {
            entityIdList: postId ? [postId] : postIds,
            entityName: 'POST',
          },
          {
            onSuccess: data => {
              if (data?.wishList_removeFromAllWishLists?.code === 1) {
                onClose();
                toast({message: 'Removed successfully', type: 'success'});
                queryClient.invalidateQueries(['getPosts'], {exact: false});
                queryClient.invalidateQueries(
                  ['post_getUserAndFollowingPosts'],
                  {
                    exact: false,
                  },
                );
                queryClient.invalidateQueries(['post_getWishLists'], {
                  exact: false,
                });
              } else {
                toast({
                  message: data?.wishList_removeFromAllWishLists?.value,
                  type: 'error',
                });
              }
            },
            onError: errorData => {
              toast({message: 'Something went wrong', type: 'error'});
            },
          },
        );
      } else
        removeMutate(
          {
            wishListId: wishItem?.wishList?.id,
            entityIdList: postId ? [postId] : postIds,
          },
          {
            onSuccess: data => {
              if (data?.wishList_removeFromWishList?.code === 1) {
                onClose();
                toast({message: 'Removed successfully'});
                queryClient.invalidateQueries(['getPosts'], {exact: false});
                queryClient.invalidateQueries(
                  ['post_getUserAndFollowingPosts'],
                  {
                    exact: false,
                  },
                );
                queryClient.invalidateQueries(['post_getWishLists'], {
                  exact: false,
                });
              } else {
                toast({
                  message: data?.wishList_removeFromWishList?.value,
                });
              }
            },
            onError: errorData => {
              toast({message: 'Something went wrong'});
            },
          },
        );
    else
      mutate(
        {wishListId: wishItem?.wishList?.id, entityIdList: [postId]},
        {
          onSuccess: data => {
            if (data?.wishList_addToWishList?.code === 1) {
              onClose();
              toast({message: 'Added successfully'});
              queryClient.invalidateQueries(['getPosts'], {exact: false});
              queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
                exact: false,
              });
              queryClient.invalidateQueries(['post_getWishLists'], {
                exact: false,
              });
            } else {
              toast({message: data?.wishList_addToWishList?.value});
            }
          },
          onError: errorData => {
            toast({message: 'Something went wrong'});
          },
        },
      );
  };

  const [photoUrl, setPhotoUrl] = useState();

  const setWishImage = () => {
    if (
      wishItem?.wishList?.wishListPosts?.[0]?.post?.mediaGalleryUrl ||
      wishItem?.wishList?.wishListPosts?.[0]?.post?.thumbnail
    ) {
      const item = wishItem?.wishList?.wishListPosts?.[0]?.post;
      if (item?.postType === 'REELS') {
        setPhotoUrl(item?.thumbnail);
      } else {
        let items = JSON?.parse(
          item?.mediaGalleryUrl ? item?.mediaGalleryUrl : '{}',
        );
        setPhotoUrl(
          items?.[0]?.type === 'VIDEO'
            ? items?.[0]?.thumbnailUrl
            : items?.[0]?.url,
        );
      }
    }
  };
  useEffect(() => {
    setWishImage();
  }, [wishItem]);

  return (
    <HStack alignItems="center" space="8px">
      <Image style={styles.image} resizeMode="cover" src={photoUrl} />
      <Typography
        color="gray.800"
        fontSize="md"
        flexShrink="1"
        fontWeight="600"
        numberOfLines={1}>
        {wishItem?.wishList?.name ?? wishItem?.name}
      </Typography>
      <VStack flex="1" />
      <TouchableOpacity
        style={[
          styles.addCircle,
          wishItem?.postIsInWishList && {
            backgroundColor: getColor({color: 'primary.500'}),
          },
        ]}
        onPress={addOnPress}>
        {addIsLoading || removeIsLoading || removeAllLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {wishItem?.postIsInWishList ? (
              <TickIconSet color={getColor({color: 'background.200'})} />
            ) : (
              <AddIconSet color={getColor({color: 'primary.500'})} />
            )}
          </>
        )}
      </TouchableOpacity>
    </HStack>
  );
};

export default memo(WishlistItem);

const styles = StyleSheet.create({
  image: {width: scale(60), height: scale(60), borderRadius: 10},

  addCircle: {
    borderWidth: 2,
    width: scale(40),
    height: scale(40),
    borderRadius: scale(40) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: getColor({color: 'primary.500'}),
  },
});
