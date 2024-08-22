import {
  BillingDetails,
  confirmPayment,
  initStripe,
} from '@stripe/stripe-react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {useQueryClient} from 'react-query';
import ShoppingBasketIcon from '~/assets/icons/CustomIcons/ShoppingBasket.icon';
import ShoppingCardIcon from '~/assets/icons/CustomIcons/ShoppingCard.icon';
import {
  Button,
  FlatList,
  Form,
  HStack,
  Layer,
  Screen,
  Scrollable,
  TrashIconSet,
  Typography,
  VStack,
  View,
  getColor,
  useNavigate,
  useToast,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import useAuthStore from '~/stores/authStore';
import usePaymentStore from '~/stores/paymentStore';
import useShoppingBasketStore from '~/stores/shoppingBascketStore';
import {formatPrice} from '~/utils/helper/formatPrice';
import DeleteConfirmModal from './Modals/DeleteConfirmModal';
import OrderItem from './OrderItem';
import {
  useGetShoppingCards,
  usePurcheseCard,
  useSetPayWithIntent,
} from './hooks';

const ShoppingBasket = ({
  taxChecked = 'false',
  feeChecked = 'false',
  taxValue,
  feeValue,
  headerComponent,
  item,
}: {
  taxChecked?: string;
  feeChecked?: string;
  taxValue?: string;
  feeValue?: string;
  headerComponent?: any;
  item?: any;
}) => {
  const {navigateWithName} = useNavigate();

  const queryClient = useQueryClient();
  const [hasErorr, setHasError] = useState(false);

  const user = useAuthStore(state => state?.user);

  const billingDetails: BillingDetails = {
    email: user?.email,
    name: user?.fullName,
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const shoppingBasketList = useShoppingBasketStore(
    state => state?.shoppingBasketList,
  );

  const {} = useHeader({
    hidden: !item ? true : false,
    title: {children: 'Orders', fontSize: 'md', fontWeight: 'bold'},
  });

  const token = useAuthStore(state => state?.token);
  const setIsUserLoggedIn = useAuthStore(state => state?.setIsUserLoggedIn);

  const User = useAuthStore(state => state?.user);
  const trackingId = item?.id;
  const {isLoading, data, error}: any = useGetShoppingCards({
    where: {
      ...(trackingId && {
        id: {
          eq: trackingId,
        },
      }),
      ...(!trackingId && {
        orderStatus: {
          eq: 'PENDING',
        },
      }),
      ...(!trackingId && {
        userId: {
          eq: User?.id,
        },
      }),
    },
  });

  const Address = data?.pages?.[0]?.shippingAddress;

  const TotalCounter = useMemo(() => {
    let price = 0;
    for (
      let i = 0;
      i < data?.pages[0]?.shoppingCardSellers?.shoppingCardDetails?.length;
      i++
    ) {
      price +=
        data?.pages[0]?.shoppingCardSellers?.shoppingCardDetails[i]
          ?.finalPrice *
        data?.pages[0]?.shoppingCardSellers?.shoppingCardDetails[i]?.quantity;
    }
    return price;
  }, [data]);

  const renderItem = ({item}: any) => {
    return (
      <OrderItem
        item={item}
        trackingId={trackingId}
        hasAddress={Address ? true : false}
        hasErorr={hasErorr}
      />
    );
  };

  const itemSeparatorComponent = () => <View style={styles.space} />;

  const findPrice = useMemo(() => {
    let priceCount = 0;
    shoppingBasketList.map(
      i => (priceCount += i?.product?.price * i?.quantity),
    );
    return {
      orderSummary: priceCount,
      total:
        priceCount + (priceCount * Number(taxValue)) / 100 + Number(feeValue),
    };
  }, [shoppingBasketList]);

  const {toast} = useToast();
  const checkShipping = () => {
    const hasNull = data?.pages[0]?.shoppingCardSellers?.map(i => {
      return i?.shipEngineRateInfo;
    });

    if (hasNull?.filter(i => i === null).length > 0) {
      toast({
        message: 'Choose shipping method for each product',
        type: 'error',
        containerStyle: styles.toastContainer,
      });
      setHasError(true);
    } else {
      data?.pages?.[0]?.paymentMethod &&
        Address &&
        getPublishKey(items?.[0]?.name);
    }
  };

  const [isLoadingPurchese, setIsLoadingPurchese] = useState(false);
  const {mutate: mutatePayWithIntent, isLoading: isLoadingPayWithIntent} =
    useSetPayWithIntent();

  const items = [
    {
      name: 'Product',
      price: data?.pages[0]?.purchasePrice - data?.pages[0]?.deliveryFee,
    },
    {
      name: 'Shipment',
      price: data?.pages[0]?.deliveryFee,
    },
  ];

  const payment = usePaymentStore(state => state?.payment);
  const setPayment = usePaymentStore(state => state?.setPayment);

  const {mutate: mutatePurchase} = usePurcheseCard();
  const purchaseCard = () => {
    const input = {
      shoppingCardId: data?.pages[0]?.id,
    };
    mutatePurchase(input, {
      onSuccess(data: any, variables, context) {
        queryClient.invalidateQueries(['getShoppingCards']);
        setPayment([]);
        setIsLoadingPurchese(false);
        if (data?.ecommerce_purchaseCard?.status?.code === 1) {
          navigateWithName('payment', {
            status: 'Success',
            item: {...data?.ecommerce_purchaseCard?.result},
          });
        } else {
          navigateWithName('payment', {
            status: 'Failed',
            item: {...data?.ecommerce_purchaseCard},
          });
          toast({message: data?.ecommerce_purchaseCard?.status?.description});
        }
      },
    });
  };

  const stripePayment = async (type, publishableKey, clientSecret) => {
    const stripe = initStripe({
      publishableKey: publishableKey,
      merchantIdentifier: 'merchant.com.aso',
    });
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        paymentMethodId:
          data?.pages?.[0]?.paymentMethod &&
          (type === items?.[0]?.name
            ? JSON.parse(data?.pages?.[0]?.paymentMethod)?.id
            : JSON.parse(data?.pages?.[0]?.paymentMethod)?.apsyPaymentMethodId),
        billingDetails,
      },
    });

    if (paymentIntent?.status === 'Succeeded' && !payment?.includes(type)) {
      setPayment([...payment, type]);
    }
    if (error) {
      toast({message: error.message});
      setIsLoadingPurchese(false);
    }
    stripe === null;
  };

  useEffect(() => {
    if (
      payment?.includes(items?.[0]?.name) &&
      payment?.includes(items?.[1]?.name)
    ) {
      purchaseCard();
    } else if (payment?.includes(items?.[0]?.name) && items?.[0]?.price) {
      getPublishKey(items?.[1]?.name);
    }
  }, [payment]);

  const getPublishKey = type => {
    setIsLoadingPurchese(true);
    mutatePayWithIntent(
      {
        amount: items?.[0]?.price,
        amountForApsy: items?.[1]?.price,
      },
      {
        onSuccess(data: any, variables, context) {
          stripePayment(
            type,
            type === items?.[0]?.name
              ? data?.paymentStripe_payWithIntent?.result?.publishableKey
              : data?.paymentStripe_payWithIntent?.result?.apsyPublishableKey,
            type === items?.[0]?.name
              ? data?.paymentStripe_payWithIntent?.result?.clientSecret
              : data?.paymentStripe_payWithIntent?.result?.apsyClientSecret,
          );
        },
      },
    );
  };

  return isLoadingPurchese || isLoadingPayWithIntent ? (
    <View style={styles.prossesContainer}>
      <ActivityIndicator size={'large'} />
      <Typography style={styles.prossesText}>
        Processing your payment
      </Typography>
    </View>
  ) : (
    <Screen isLoading={isLoading}>
      {!headerComponent && (
        <Layer style={styles.headerContainer}>
          <Typography style={styles.shoppingBasketText}>
            Shopping Basket
          </Typography>
          {(token
            ? data?.pages[0]?.shoppingCardSellers?.length > 0
            : shoppingBasketList?.length > 0) && (
            <TouchableOpacity onPress={() => setIsDeleteModalVisible(true)}>
              <TrashIconSet />
            </TouchableOpacity>
          )}
        </Layer>
      )}
      {(
        !token
          ? shoppingBasketList?.length === 0
          : data?.pages[0]?.shoppingCardSellers?.length === 0 ||
            data?.pages[0]?.shoppingCardSellers?.length === undefined
      ) ? (
        <Screen isLoading={isLoading}>
          <Layer style={styles.shoppingIconContainer}>
            <ShoppingBasketIcon />
            <Typography color={'gray.400'} style={styles.shoppingText}>
              Shopping basket is empty!
            </Typography>
          </Layer>
        </Screen>
      ) : (
        <Scrollable
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <Form style={styles.form}>
            {headerComponent}
            <Layer style={styles.orderDetailContainer}>
              {token && !item?.id && (
                <VStack space="1.5" mt="5">
                  <Typography style={styles.title}>Order Details</Typography>
                  <Typography style={styles.text}>
                    Order No: {data?.pages[0]?.id}{' '}
                  </Typography>

                  <Typography style={styles.text}>
                    Order Date:{' '}
                    <Typography style={styles.orderDateText}>
                      {(
                        '0' +
                        (new Date(data?.pages[0]?.orderDate).getMonth() + 1)
                      ).slice(-2)}
                      /
                      {(
                        '0' + new Date(data?.pages[0]?.orderDate).getDate()
                      ).slice(-2)}
                      /{new Date(data?.pages[0]?.orderDate).getFullYear()}
                    </Typography>
                  </Typography>
                  <Typography style={styles.text}>
                    Time:{' '}
                    <Typography style={styles.orderDateText}>
                      {new Date(data?.pages[0]?.orderDate).toLocaleTimeString(
                        'en-US',
                        {
                          hour12: true,
                          hour: 'numeric',
                          minute: 'numeric',
                        },
                      )}
                    </Typography>
                  </Typography>
                </VStack>
              )}
            </Layer>

            <VStack mt="5" space="4" width="100%">
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Typography style={styles.title} mt={0}>
                  Order Items
                </Typography>
                <Typography color={'secondary.500'} style={styles.itemsText}>
                  {token
                    ? data?.pages[0]?.shoppingCardSellers?.length
                    : shoppingBasketList?.length}{' '}
                  {(
                    token
                      ? data?.pages[0]?.shoppingCardSellers?.length <= 1
                      : shoppingBasketList?.length <= 1
                  )
                    ? 'Item'
                    : 'Items'}
                </Typography>
              </HStack>

              <FlatList
                data={
                  token
                    ? data?.pages[0]?.shoppingCardSellers
                    : shoppingBasketList
                }
                style={styles.FlatList}
                contentContainerStyle={styles.flatlistContainer}
                renderItem={renderItem}
                ItemSeparatorComponent={itemSeparatorComponent}
              />
              {token && !item?.id && (
                <>
                  <TouchableOpacity
                    disabled={item?.id ? true : false}
                    onPress={() =>
                      navigateWithName('ShippingAddress', {
                        route: 'list',
                        item: data?.pages[0],
                      })
                    }>
                    <HStack
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <Typography style={styles.title} mb={4}>
                        Shipping Address
                      </Typography>
                    </HStack>
                    <VStack
                      style={{
                        ...styles.shadowContainer,
                        backgroundColor: getColor({
                          color: item?.id ? 'background.700' : 'background.500',
                        }),
                      }}>
                      <Typography style={styles.priceItem}>
                        {Address ? '' : '+Add'}
                        {Address?.zipcode} {Address?.street}{' '}
                        {Address?.aptSuiteBuilding} {Address?.state}{' '}
                        {Address?.country}{' '}
                      </Typography>
                    </VStack>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={item?.id ? true : false}
                    onPress={() =>
                      navigateWithName('payment methods', {
                        item: data?.pages?.[0],
                      })
                    }>
                    <HStack
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <Typography style={styles.title} mb={4}>
                        Payment Methods
                      </Typography>
                    </HStack>
                    <HStack
                      style={{
                        ...styles.shadowContainer,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: getColor({
                          color: item?.id ? 'background.700' : 'background.500',
                        }),
                      }}>
                      <Layer>
                        <Typography>Credit Card</Typography>
                        {data?.pages?.[0]?.paymentMethod && (
                          <Typography color={'gray.500'}>
                            {data?.pages?.[0]?.paymentMethod
                              ? '•••• •••• ••••'
                              : 'Select a card'}{' '}
                            {data?.pages?.[0]?.paymentMethod &&
                              JSON.parse(data?.pages?.[0]?.paymentMethod)
                                ?.last4}
                          </Typography>
                        )}
                      </Layer>
                      <ShoppingCardIcon />
                    </HStack>
                  </TouchableOpacity>
                </>
              )}
              <HStack justifyContent={'space-between'} alignItems="center">
                <Typography style={styles.title}>Prices</Typography>
              </HStack>

              <VStack space="4" style={styles.shadowContainer}>
                <HStack style={styles.priceContainer}>
                  <Typography style={styles.priceItem}>
                    Original Price
                  </Typography>
                  <Typography style={styles.priceItem}>
                    $
                    {token
                      ? formatPrice(data?.pages[0]?.subTotal) ||
                        formatPrice(TotalCounter)
                      : formatPrice(findPrice?.orderSummary)}
                  </Typography>
                </HStack>
                <HStack style={styles.priceContainer}>
                  <Typography style={styles.priceItem}>Shipping Fee</Typography>
                  <Typography style={styles.priceItem}>
                    ${formatPrice(data?.pages[0]?.deliveryFee) || 0}
                  </Typography>
                </HStack>
                <HStack style={styles.priceContainer}>
                  <Typography style={styles.priceItem}>Handling Fee</Typography>
                  <Typography style={styles.priceItem}>
                    ${formatPrice(data?.pages[0]?.handlingPrice) || 0}
                  </Typography>
                </HStack>
                <HStack style={styles.priceContainer}>
                  <Typography style={styles.priceItem}>
                    Sales Tax (%{data?.pages[0]?.taxPercent || 0})
                  </Typography>
                  <Typography style={styles.priceItem}>
                    ${formatPrice(data?.pages[0]?.tax) || 0}
                  </Typography>
                </HStack>
                <HStack style={styles.priceContainer}>
                  <Typography style={styles.priceItem}>Discount</Typography>
                  <Typography style={styles.priceItem}>
                    ${formatPrice(data?.pages[0]?.totalDiscount) || 0}
                  </Typography>
                </HStack>
                <Layer style={styles.devider} />
                <Layer style={styles.totalTextConatiner}>
                  <Typography color={'primary.500'} style={styles.totalText}>
                    TOTAL
                  </Typography>
                  <Typography color={'primary.500'} style={styles.totalText}>
                    $
                    {token
                      ? formatPrice(data?.pages[0]?.purchasePrice)
                      : formatPrice(findPrice?.total)}
                  </Typography>
                </Layer>
              </VStack>
            </VStack>
            {!trackingId &&
              (!token ? (
                <>
                  <Button
                    style={styles.login}
                    onPress={() => setIsUserLoggedIn(false)}>
                    Login
                  </Button>
                  <Layer style={styles.newUserContiainer}>
                    <Typography>New user?</Typography>
                    <Button
                      variant={'link'}
                      onPress={() => [
                        setIsUserLoggedIn(false),
                        navigateWithName('signup'),
                      ]}>
                      Create an account
                    </Button>
                  </Layer>
                </>
              ) : (
                <>
                  <Button
                    isLoading={isLoadingPurchese}
                    disabled={!data?.pages?.[0]?.paymentMethod && !Address}
                    bgColor={
                      data?.pages?.[0]?.paymentMethod && Address
                        ? null
                        : 'primary.200'
                    }
                    onPress={() => checkShipping()}
                    style={styles.payButton}>
                    Pay
                  </Button>
                </>
              ))}
          </Form>
        </Scrollable>
      )}
      <DeleteConfirmModal
        item={item}
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />
    </Screen>
  );
};

export default ShoppingBasket;

const styles = StyleSheet.create({
  prossesText: {marginTop: 10},
  prossesContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {height: 10},
  toastContainer: {top: 70},
  newUserContiainer: {flexDirection: 'row', alignItems: 'center'},
  login: {
    width: '96%',
    height: 49,
    marginTop: 40,
    margin: 8,
    marginHorizontal: 16,
  },
  totalText: {
    fontWeight: '900',
    fontSize: 18,
  },
  devider: {
    width: '100%',
    height: 2,
    backgroundColor: getColor({color: 'gray.300'}),
  },
  FlatList: {
    paddingVertical: 5,
    overflow: 'visible',
  },
  flatlistContainer: {padding: 5},
  itemsText: {fontSize: 15, fontWeight: '500'},
  text: {fontSize: 14, fontWeight: '400'},
  shoppingText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30,
  },
  shoppingIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    zIndex: 3,
    backgroundColor: getColor({color: 'background.500'}),
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  shadowContainer: {
    padding: 16,
    backgroundColor: getColor({color: 'background.500'}),
    shadowColor: getColor({color: 'gray.300'}),
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    borderRadius: 10,
    marginHorizontal: 4,
    elevation: 5,
  },
  orderDetailContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  priceContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceItem: {
    fontWeight: '600',
    fontSize: 15,
  },
  payButton: {
    width: '96%',
    height: 49,
    marginTop: 20,
  },
  shoppingBasketText: {fontSize: 25, fontWeight: '700', lineHeight: 32},
  container: {paddingBottom: 80},
  form: {alignItems: 'center'},
  orderDateText: {fontSize: 14, fontWeight: '500'},
  totalTextConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
