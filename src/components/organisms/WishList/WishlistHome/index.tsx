import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import WishlistIcon from '~/assets/icons/CustomIcons/Wishlist.icon';
import {Button, Typography} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import {isElementInModel} from '~/utils/helper/isElementsInModel';
import {useGetWishLists} from '../hook';
import WishListHeader from './WishListHeader';
import WishListItem from './WishListItem';

const WishlistHome = ({}) => {
  const token = useAuthStore(state => state?.token);
  const setIsUserLoggedIn = useAuthStore(state => state?.setIsUserLoggedIn);

  const hasProduct = useMemo(() => {
    return isElementInModel('ProductHome');
  }, []);

  const {data, refetch, isRefetching, isLoading, hasNextPage, fetchNextPage} =
    useGetWishLists({
      entityName: hasProduct ? 'product' : 'post',
      where: hasProduct
        ? {wishList: {wishListEntities: {any: true}}}
        : undefined,
    });

  const renderItem = ({item}) => {
    return <WishListItem item={item} />;
  };

  const emptyComponent = () => {
    return isLoading ? (
      <Typography color={'gray.300'} style={styles.loading}>
        Loading...
      </Typography>
    ) : (
      <View style={styles.wishlistIconContainer}>
        <WishlistIcon />
        <Typography color={'gray.400'} style={styles.text}>
          {hasProduct
            ? `You haven’t wished to have anything yet!`
            : `Your haven’t saved
anything yet`}
        </Typography>
        {!token && (
          <Button
            style={styles.button}
            onPress={() => setIsUserLoggedIn(false)}>
            Log in
          </Button>
        )}
      </View>
    );
  };

  return (
    <>
      <WishListHeader />
      {token ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={isRefetching}
          onRefresh={refetch}
          data={data?.pages}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item?.wishList?.id}`}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          ListEmptyComponent={emptyComponent}
          contentContainerStyle={
            data?.pages?.length === 0 ? styles.contentContainerStyle : undefined
          }
        />
      ) : (
        emptyComponent()
      )}
    </>
  );
};

export default WishlistHome;

const styles = StyleSheet.create({
  loading: {alignSelf: 'center', margin: 20},

  wishlistIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    alignSelf: 'center',
    margin: 40,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },

  button: {width: 144},

  contentContainerStyle: {flex: 1, alignItems: 'center', width: '100%'},
});
