import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  FlatList,
  Image,
  LoadIndicator,
  MoreIconSet,
  PlusIcon,
  Typography,
  deviceHeight,
  deviceWidth,
  useNavigate,
} from '~/components/elemental';
import {useGetPostWishLists} from './hooks';
import {GetWishPostImage} from './helper';
import MenuActionSheet from './MenuActionSheet';
import {Box, VStack} from 'native-base';
import useHeader from '~/components/elemental/hooks/use_header';
import CreateWishlistActionSheet from '../SocialHome/PostList/Modals/CreateWishlistActionSheet';
import {WithLocalSvg} from 'react-native-svg';
import {EmptyUnsaved} from '~/assets';

const PostWishList = () => {
  const [visibleAdd, setVisibleAdd] = useState(false);
  const onAddPress = () => {
    setVisibleAdd(true);
  };
  const {} = useHeader({
    title: {children: 'Saved'},
    icons: <PlusIcon color="gray.800" onPress={onAddPress} />,
  });

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetPostWishLists();

  const renderItem = ({item, index}) => {
    return <WishlistItem {...{item}} />;
  };

  const onEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  const onCloseAdd = () => {
    setVisibleAdd(false);
  };

  const {navigateWithName} = useNavigate();
  const onWishlistCreated = (wishlist: any) => {
    onCloseAdd();
    navigateWithName('WishListDetail', {
      mode: 'add',
      boardId: wishlist?.id,
    });
  };

  const isEmpty =
    data?.pages?.length === 1 &&
    data?.pages?.[0]?.wishList?.wishListPosts?.length === 0;

  return (
    <>
      <View style={styles.flex1}>
        {isLoading && <LoadIndicator />}
        {isEmpty ? (
          <VStack
            marginTop={170}
            alignItems="center"
            justifyContent="center"
            space="8">
            <WithLocalSvg asset={EmptyUnsaved} />
            <Typography
              color="gray.400"
              fontWeight="400"
              fontSize="xl"
              w="50%"
              textAlign="center">
              Your haven’t saved anything yet
            </Typography>
          </VStack>
        ) : (
          <FlatList
            data={data?.pages}
            {...{
              isFetchingNextPage,
              renderItem,
              isLoading,
              onEndReached,
              refreshing: false,
              onRefresh: refetch,
              ItemSeparatorComponent: () => <Box h={7} />,
            }}
          />
        )}
      </View>
      {visibleAdd && (
        <CreateWishlistActionSheet
          isVisible={visibleAdd}
          onClose={onCloseAdd}
          postAction={onWishlistCreated}
        />
      )}
    </>
  );
};
export default PostWishList;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  menuIcon: {transform: [{rotate: '90deg'}]},
  itemContainer: {
    marginVertical: 4,
    marginHorizontal: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemPhotoContainer: {flexDirection: 'row', width: '100%'},
  emptyIcon: {height: 0.18 * deviceHeight},
});

const WishlistItem = ({item}) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const postItems = item?.wishList?.wishListPosts;
  const onCloseMenu = () => setVisibleMenu(false);
  const onOpenMenu = () => setVisibleMenu(true);

  return (
    <>
      <View style={styles.itemContainer}>
        <View>
          <View style={styles.itemHeader}>
            <View>
              <Typography color="gray.800" fontSize="md" fontWeight="600">
                {item?.wishList?.name}
              </Typography>
              <Typography color="gray.800" fontSize="sm" fontWeight="400">
                {`${item?.wishList?.wishListPosts?.length} item`}{' '}
              </Typography>
            </View>
            <MoreIconSet style={styles.menuIcon} onPress={onOpenMenu} />
          </View>
          <View style={styles.itemPhotoContainer}>
            <ImageItem item={postItems?.[0]?.post} index={0} />
            {postItems?.[1]?.post && (
              <ImageItem item={postItems?.[1]?.post} index={1} />
            )}
            {postItems?.length > 2 && (
              <View>
                <ImageItem
                  item={postItems?.[2]?.post}
                  type={postItems?.length > 3 ? 'mini' : 'normal'}
                  index={2}
                />
                <ImageItem
                  item={postItems?.[3]?.post}
                  type={'mini'}
                  index={3}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      {visibleMenu && (
        <MenuActionSheet
          isVisible={visibleMenu}
          onClose={onCloseMenu}
          item={item?.wishList}
        />
      )}
    </>
  );
};

const ImageItem = ({item, type = 'normal', index}) => {
  const source = useMemo(() => {
    return GetWishPostImage(item);
  }, [item]);
  return (
    <>
      {source ? (
        <Image
          src={source}
          style={{
            width: (deviceWidth - 40) / 3,
            height:
              type === 'normal' ? 0.18 * deviceHeight : 0.09 * deviceHeight,
            borderBottomLeftRadius: index === 0 ? 10 : 0,
            borderBottomRightRadius:
              index === 3 || (index === 2 && type === 'normal') ? 15 : 0,
          }}
        />
      ) : index === 0 ? (
        <View style={styles.emptyIcon} />
      ) : (
        <></>
      )}
    </>
  );
};
