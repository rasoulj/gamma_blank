import {useRoute} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';
import useNavigate from '../../../elemental/hooks/use_navigate';
import {useGetOrderAddress, useUpdateShoppingCard} from '../hook';
import ListShippingAddressItem from './ListShippingAddressItem';

const ListShippingAddress = ({item}: {item: any}) => {
  const {navigateWithName, navigation} = useNavigate();
  const route: any = useRoute();

  const {
    data,
  }: any = useGetOrderAddress({
    order: {
      createdDate: 'DESC',
    },
  });
  const renderItem = ({item}) => {
    return <ListShippingAddressItem item={item} />;
  };

  const defaultShippingItem: any = data?.pages?.filter(
    i => i?.isDefault === true,
  )?.[0];

  const {mutate: mutateUpdateShoppingCard, isLoading: isLoadingShoppingCard} =
    useUpdateShoppingCard();

  const queryClient = useQueryClient();

  const confirm = () => {
    const inputShopping = {
      id: route?.params?.item?.id,
      shippingAddressId: defaultShippingItem?.id,
    };

    if (route?.params?.item?.id) {
      mutateUpdateShoppingCard(
        {input: inputShopping},
        {
          async onSuccess(data, variables, context) {
            queryClient.invalidateQueries(['getShoppingCards']);
            queryClient.refetchQueries(['getOrderAddress']);

            navigation?.goBack();
          },
        },
      );
    }
  };
  const HeaderComponent = () => {
    return (
      <Button
        onPress={() =>
          navigateWithName('ShippingAddress', {route: 'add', item})
        }
        style={styles.addNewAddressContainer}
        variant={'outline'}>
        <Typography color={'primary.500'} style={styles.addNewText}>
          Add new location
        </Typography>
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.pages}
        contentContainerStyle={styles.flatlist}
        renderItem={renderItem}
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={<View style={styles.footer} />}
      />
      <Button
        isDisabled={!defaultShippingItem?.id}
        style={styles.confirmButton}
        isLoading={isLoadingShoppingCard}
        onPress={confirm}>
        Confirm
      </Button>
    </View>
  );
};

export default ListShippingAddress;

const styles = StyleSheet.create({
  container: {flex: 1},
  addNewAddressContainer: {
    height: 49,
    width: '100%',
    marginVertical: 20,
  },
  addNewText: {fontSize: 16, fontWeight: '600'},
  flatlist: {flexGrow: 1, marginHorizontal: 5},
  confirmButton: {
    width: '100%',
    position: 'absolute',
    bottom: 16,
    height: 49,
  },
  footer: {height: 100},
});
