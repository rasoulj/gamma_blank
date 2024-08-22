import {
  BillingDetails,
  confirmPayment,
  initStripe,
} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  ArrowRightIconSet,
  CheckCircleIcon,
  LoadIndicator,
  Typography,
  getColor,
  useNavigate,
  useRoute,
  useToast,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import usePaymentStore from '~/stores/paymentStore';
import {formatPrice} from '~/utils/helper/formatPrice';
import {usePurcheseCard, useSetPayWithIntent} from '../hooks';

const StripeDualPay = () => {
  const route: any = useRoute();
  const {navigateWithName} = useNavigate();
  const queryClient = useQueryClient();

  const {toast} = useToast();
  const user = useAuthStore(state => state?.user);
  const {mutate} = useSetPayWithIntent();

  const succeededCard = usePaymentStore(state => state?.payment);
  const setSucceededCard = usePaymentStore(state => state?.setPayment);

  const [isLoadingPay, setIsLaodingPay] = useState('');

  const billingDetails: BillingDetails = {
    email: user?.email,
    name: user?.fullName,
  };

  const items = [
    {
      name: 'Product',
      price: route?.params?.productPrice,
      description:
        'This is the payment and price of products you are about to recieve.',
    },
    {
      name: 'Shipment',
      price: route?.params?.shipmentPrice,
      description:
        'This is the payment needed to ship the product to your location',
    },
  ];

  const {mutate: mutatePurchase, isLoading: isLoadingPurchese} =
    usePurcheseCard();
  const purchaseCard = () => {
    const input = {
      shoppingCardId: route?.params?.shoppingCardId,
    };
    mutatePurchase(input, {
      onSuccess(data: any, variables, context) {
        queryClient.invalidateQueries(['getShoppingCards']);
        if (data?.ecommerce_purchaseCard?.status?.code === 1) {
          navigateWithName('payment', {
            status: 'Success',
            item: {...data?.ecommerce_purchaseCard?.result},
          });
          setSucceededCard([]);
        } else {
          toast({message: data?.ecommerce_purchaseCard?.status?.description});
        }
      },
    });
  };
  const stripePayment = async (type, publishableKey, clientSecret) => {
    initStripe({
      publishableKey: publishableKey,
      merchantIdentifier: 'merchant.com.aso',
    });
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        paymentMethodId: route?.params?.paymentMethodId,
        billingDetails,
      },
    });

    if (paymentIntent?.status === 'Succeeded') {
      setSucceededCard([...succeededCard, type]);
    }
    if (error) {
      toast({message: error.message});
      setIsLaodingPay('');
    }
  };

  useEffect(() => {
    if (
      succeededCard?.includes(items?.[0]?.name) &&
      succeededCard?.includes(items?.[1]?.name)
    ) {
      purchaseCard();
    }
  }, [succeededCard]);

  const getPublishKey = type => {
    setIsLaodingPay(type);
    mutate(
      {
        amount: route?.params?.productPrice,
        amountForApsy: route?.params?.shipmentPrice,
      },
      {
        onSuccess(data: any, variables, context) {
          stripePayment(
            type,
            data?.paymentStripe_payWithIntent?.result?.publishableKey,
            data?.paymentStripe_payWithIntent?.result?.clientSecret,
          );
        },
      },
    );
  };

  return isLoadingPurchese ? (
    <LoadIndicator />
  ) : (
    <View style={styles.container}>
      {items?.map(item => (
        <TouchableOpacity
          disabled={succeededCard?.includes(item?.name)}
          style={{
            ...styles.paymentCard,
            borderColor: getColor({color: 'primary.500'}),
            borderWidth: succeededCard?.includes(item?.name) ? 2 : 0,
          }}
          onPress={() => getPublishKey(item?.name)}>
          <View style={styles.nameContainer}>
            <Typography style={styles.nameText}>{item?.name}</Typography>
            <Typography color={'primary.500'} style={styles.priceText}>
              ${formatPrice(item?.price)}
            </Typography>
          </View>
          <Typography style={styles.descriptionText}>
            {item?.description}
          </Typography>
          {succeededCard?.includes(item?.name) ? (
            <CheckCircleIcon style={styles.checkIcon} />
          ) : isLoadingPay === item?.name ? (
            <ActivityIndicator size={'small'} style={styles.indicator} />
          ) : (
            <ArrowRightIconSet style={styles.rightIcon} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StripeDualPay;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  paymentCard: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 15,
    shadowColor: getColor({color: "gray.800"}),
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 5,
    padding: 16,
    marginVertical: 4,
  },
  nameText: {fontSize: 14, fontWeight: '700'},
  priceText: {fontSize: 18, fontWeight: '700'},
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionText: {
    marginVertical: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  checkIcon: {
    alignSelf: 'flex-end',
    color: getColor({color: 'primary.500'}),
    width: 24,
    height: 24,
  },
  indicator: {alignSelf: 'flex-end'},
  rightIcon: {alignSelf: 'flex-end'},
});
