import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  Layer,
  Typography,
  getColor,
  useRoute,
  useToast,
} from '~/components/elemental';
import {formatPrice} from '~/utils/helper/formatPrice';
import {useGetShippingCost, useSetShippingCost} from './hook';

const ChooseShippingMethod = () => {
  const route: any = useRoute();
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const [method, setMethod] = useState(route?.params?.item?.shipEngineRateInfo);

  const {
    data,
    refetch,
    isRefetching,
    isLoading: isLoadingGetShippingMehtods,
  }:any = useGetShippingCost({
    shoppingCardSellerId: route?.params?.item?.id,
    where: {
      totalCost: {
        gt: 0,
      },
    },
  });

  useEffect(() => {
    if (data?.status?.value && data?.status?.value !== 'Success') {
      if(data?.status?.value === "NotEnoghData"){
        toast({
          message: 'Your address is invalid, please check your address',
          type: 'error',
          containerStyle: styles.toastContainer,
        });

      }else if(data?.status?.value === "Failed"){
        toast({
          message: 'shipp engine is down, please try later',
          type: 'error',
          containerStyle: styles.toastContainer,
        });

      }else{
        toast({message: 'Something is worng: ' + data?.status?.description});
      }
    }
  }, [data]);

  const {mutate, isLoading} = useSetShippingCost();
  const setShippingCast = item => {
    const input = {
      rateId: item?.rateId,
      shoppingCardSellerId: route?.params?.item?.id,
      cost: item?.totalCost,
      rateInfo: item?.serviceType,
    };
    setMethod(item?.serviceType);
    mutate(input, {
      onSuccess(data, variables, context) {
        setMethod(item?.serviceType);
        queryClient.refetchQueries(['getShoppingCards']);
      },
    });
  };

  const renderItem = ({item}) => {
    return (
      item?.serviceType && (
        <TouchableOpacity
          style={styles.methodsContainer}
          onPress={() => setShippingCast(item)}>
          <View style={styles.radio}>
            {method === item?.serviceType &&
              (isLoading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <View style={styles.circle} />
              ))}
          </View>
          <Layer style={styles.contextContainer}>
            <Typography style={styles?.title}>{item?.serviceType}</Typography>
            <Typography style={styles?.description}>
              Total Cost: {formatPrice(item?.totalCost)}
            </Typography>
          </Layer>
        </TouchableOpacity>
      )
    );
  };
  const itemSeparatorComponent = () => <View style={styles.separator} />;

  return (
    <Layer>
      {isLoadingGetShippingMehtods ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.pages}
          refreshing={isRefetching}
          onRefresh={refetch}
          style={styles.flatList}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparatorComponent}
        />
      )}
    </Layer>
  );
};

export default ChooseShippingMethod;

const styles = StyleSheet.create({
  toastContainer: {top: 70},
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  circle: {
    width: 16,
    height: 16,
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 100,
  },
  methodsContainer: {
    flexDirection: 'row',
    shadowColor: getColor({
      color: Platform.OS === 'android' ? 'gray.700' : 'gray.200',
    }),
    shadowOpacity: 1,
    shadowOffset: {height: 0, width: 0},
    backgroundColor: getColor({color: 'background.500'}),
    shadowRadius: 8,
    margin: 4,
    borderRadius: 15,
    padding: 16,
    elevation: 5,
    opacity: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: getColor({color: 'primary.500'}),
    padding: 4,
    marginRight: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextContainer: {
    flex: 1,
  },
  separator: {height: 10},
  flatList: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
