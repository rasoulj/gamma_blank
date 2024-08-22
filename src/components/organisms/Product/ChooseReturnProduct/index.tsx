import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useGetShoppingCards} from './hooks';
import {
  FlatList,
  Typography,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import useShoppingBasketStore from '~/stores/shoppingBascketStore';
import useAuthStore from '~/stores/authStore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OrderItem from './OrderItem';

const ChooseReturnProduct = () => {
  const {navigateWithName} = useNavigate();

  const route = useRoute();
  const shoppingBasketList = useShoppingBasketStore(
    state => state?.shoppingBasketList,
  );
  const setShoppingBasketList = useShoppingBasketStore(
    state => state?.setShoppingBasketList,
  );
  const token = useAuthStore(state => state?.token);
  const trackingId = route?.params?.item?.id; //check
  const {isLoading, data, error}: any = useGetShoppingCards({
    where: {
      ...(trackingId && {
        id: {
          eq: trackingId,
        },
      }),
      ...(!trackingId && {
        orderStatus: {
          eq: 'PENDING', //check
        },
      }),
    },
  });

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigateWithName('product detail', {productId: item?.product?.id})
        }>
        <OrderItem item={item} type={trackingId ? 'tracking' : 'order'} />
      </TouchableOpacity>
    );
  };

  const itemSeparatorComponent = () => <View style={{height: 10}} />;

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Typography style={{...styles.title, marginTop: 0}}>
          Order Items
        </Typography>
        <Typography
          color={'secondary.500'}
          style={{fontSize: 15, fontWeight: '500'}}>
          {token
            ? data?.pages[0]?.shoppingCardDetails.length
            : shoppingBasketList?.length}{' '}
          {(
            token
              ? data?.pages[0]?.shoppingCardDetails.length <= 1
              : shoppingBasketList?.length <= 1
          )
            ? 'Item'
            : 'Items'}
        </Typography>
      </View>
      <FlatList
        data={token ? data?.pages[0]?.shoppingCardDetails : shoppingBasketList}
        style={{
          paddingHorizontal: 5,
          paddingVertical: 5,
          overflow: 'visible',
        }}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparatorComponent}
      />
    </View>
  );
};

export default ChooseReturnProduct;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
    marginHorizontal: 4,
  },
});
