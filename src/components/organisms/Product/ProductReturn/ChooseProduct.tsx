import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  FlatList,
  Typography,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import {useGetShoppingCards} from '../hook';
import OrderItem from './OrderItem';
import useHeader from '~/components/elemental/hooks/use_header';

const ChooseProduct = ({onChange}) => {
  const route: any = useRoute();
  const {navigateWithName} = useNavigate();

  const {} = useHeader({
    title: {children: 'Choose Products', fontSize: 'md', fontWeight: 'bold'},
    onBack: () => onChange({page: 1, ids: []}),
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const trackingId = route?.params?.item?.trackingId;

  const {isLoading, data, error}: any = useGetShoppingCards({
    where: {
      ...(trackingId && {
        id: {
          eq: trackingId,
        },
      }),
    },
  });

  const addProduct = i => {
    selectedProducts?.includes(i)
      ? setSelectedProducts(
          selectedProducts?.filter(it => i?.productId !== it?.productId),
        )
      : setSelectedProducts([...selectedProducts, i]);
  };
  const renderItem = ({item}: any) => {
    return item?.shoppingCardDetails?.map(i => {
      return (
        <TouchableOpacity
          onPress={() => addProduct(i)}
          style={styles.itemContainer}>
          <OrderItem
            item={i}
            selectedItem={selectedProducts?.includes(i)}
            onToggle={() => addProduct(i)}
          />
        </TouchableOpacity>
      );
    });
  };

  const itemSeparatorComponent = () => <View style={styles.itemSeparator} />;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography style={styles.title}>Order Items</Typography>
          <Typography color={'secondary.500'} style={styles.itemCountText}>
            {selectedProducts?.length}{' '}
            {selectedProducts?.length <= 1 ? 'Item' : 'Items'}
          </Typography>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.pages[0]?.shoppingCardSellers || []}
          style={styles.flatList}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparatorComponent}
          ListFooterComponent={<View style={styles.listFooter} />}
        />
      </View>
      <Button
        style={styles.button}
        onPress={() => onChange({page: 3, ids: selectedProducts})}>
        Next
      </Button>
    </>
  );
};

export default ChooseProduct;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
    marginHorizontal: 4,
  },
  itemCountText: {
    fontSize: 15,
    fontWeight: '500',
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  itemSeparator: {},
  flatList: {
    flexGrow: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 60,
  },
  listFooter: {
    height: 100,
  },
  button: {
    width: '100%',
    height: 49,
    marginVertical: 10,
    position: 'absolute',
    bottom: 5,
  },
});
