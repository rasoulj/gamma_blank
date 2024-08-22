import React, { Fragment, useMemo, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useQueryClient } from 'react-query';
import PaymentMethodsIcon from '~/assets/icons/payment/paymentMethodsIcon';
import {
  AddIconSet,
  Button,
  Typography,
  VStack,
  useNavigate,
  useRoute,
  useToast,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import EnrollStatusModal from '~/components/organisms/CourseDetail/Modals/EnrollStatusModal';
import {
  useCreateEnrollEducation,
  useCreatePaymentEducation,
} from '~/components/organisms/CourseList/hook';
import AddCardModal from './Modals/AddCardModal';
import PaymentMethodItem from './PaymentMethodItem';
import {useGetPaymantMethods, useUpdateShoppingCardStatus} from './hook';
import {useSetPayWithIntent} from '~/components/organisms/ShoppingBasket/hooks';
import {
  BillingDetails,
  confirmPayment,
  initStripe,
} from '@stripe/stripe-react-native';
import useAuthStore from '~/stores/authStore';

const PaymentMethods = () => {
  const route: any = useRoute();
  const queryClient = useQueryClient();
  const {navigation} = useNavigate();

  const {toast} = useToast();
  const {navigateWithName} = useNavigate();

  const user = useAuthStore(state => state?.user);

  const [isAddCardModalVisible, setIsAddCardModalVisible] = useState(false);
  const [shoppingMethods, setShoppingMethods] = useState(null);
  const [selectedCard, setSelectedCArd] = useState<any>();
  const [addCard, setAddCard] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);

  const {data, refetch, isRefetching, hasNextPage, fetchNextPage} =
    useGetPaymantMethods();

  const icons = useMemo(() => {
    return data?.pages.length > 0 || addCard ? (
      <AddIconSet onPress={() => setIsAddCardModalVisible(true)} />
    ) : null;
  }, [addCard, data]);

  const {} = useHeader({
    title: {children: 'Payment Methods', fontWeight: 'bold'},
    icons,
  });

  const billingDetails: BillingDetails = {
    email: user?.email,
    name: user?.fullName,
  };

  const renderItem = ({item}) => {
    if (item?.saveForFuturePurchases) {
      setShoppingMethods(item);
      setSelectedCArd(item);
    }
    return <PaymentMethodItem item={item} cardData={setSelectedCArd} />;
  };

  const listEmptyComponent = () => (
    <VStack alignItems={'center'} mt="40%">
      <PaymentMethodsIcon />
      <Typography color="gray.400" fontSize="xl" mt="6">
        No payment methods yet!
      </Typography>
    </VStack>
  );

  const {mutate, isLoading} = useUpdateShoppingCardStatus();

  const {mutate: enrollMutate, isLoading: enrollLoading} =
    useCreateEnrollEducation();
  const {mutate: mutatePayWithIntent, isLoading: isLoadingPayWithIntent} =
    useSetPayWithIntent();

  const purcheseCard = () => {
    if (route?.params?.isSetting) {
      navigation.goBack();
      return;
    }

    if (route?.params?.entityName === 'course') {
      mutatePayWithIntent(
        {
          amount: route?.params?.item?.price,
          amountForApsy: 0,
        },
        {
          onSuccess: async function (data: any) {
            initStripe({
              publishableKey:
                data?.paymentStripe_payWithIntent?.result?.publishableKey,
              merchantIdentifier: 'merchant.com.aso',
            });
            const {error, paymentIntent} = await confirmPayment(
              data?.paymentStripe_payWithIntent?.result?.clientSecret,
              {
                paymentMethodType: 'Card',
                paymentMethodData: {
                  paymentMethodId: selectedCard?.id,
                  billingDetails,
                },
              },
            );

            if (paymentIntent?.status === 'Succeeded') {
              enrollMutate(
                {
                  input: {
                    courseId: route?.params?.item?.id,
                    status: 'IN_PROGRESS',
                  },
                },
                {
                  onSuccess(d) {
                    if (d?.course_enroll?.status?.value === 'Success') {
                      queryClient.invalidateQueries(['getCourses']);
                      setShowEnroll(true);
                    } else {
                      toast({
                        message: d?.course_enroll?.status?.description,
                        type: 'error',
                      });
                    }
                  },
                },
              );
            }
            if (error) {
              toast({message: error.message, type: 'error'});
            }
          },
        },
      );
    } else if (!route?.params?.item?.id) {
      navigation?.goBack();
    } else {
      const input = {
        id: route?.params?.item?.id,
        paymentMethod: JSON.stringify(shoppingMethods),
      };
      mutate(
        {input},
        {
          onSuccess(data) {
            queryClient.refetchQueries(['getShoppingCards']);
            navigation?.goBack();
          },
        },
      );
    }
  };

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };


  return (
    <Fragment>
      <FlatList
        data={data?.pages?.filter(i => i !== undefined)}
        renderItem={renderItem}
        style={styles.flatList}
        keyExtractor={(_, index) => `key${index}`}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={() => {
          onLoadMore?.();
        }}
        ListEmptyComponent={listEmptyComponent}
      />
      {data?.pages?.filter(i => i !== undefined)?.length > 0 || addCard ? (
        <Button
          disabled={!shoppingMethods}
          isLoading={isLoading || enrollLoading || isLoadingPayWithIntent}
          style={styles.margin}
          onPress={purcheseCard}>
          {route?.params?.isSetting ? 'Done' : 'Confirm'}
        </Button>
      ) : (
        <Fragment>
          {!route?.params?.isSetting &&
            route?.params?.entityName === 'course' && (
              <Button
                variant={'outline'}
                isLoading={isLoading || enrollLoading}
                style={styles.mb}
                onPress={() =>
                  navigateWithName('Payment', {
                    entityId: route?.params?.item?.id,
                    price: route?.params?.item?.price,
                    type: 'COURSE',
                  })
                }>
                One time Purchace
              </Button>
            )}
          <Button
            isLoading={isLoading || enrollLoading}
            mb="5"
            onPress={() => {
              setAddCard(true);
              setIsAddCardModalVisible(true);
            }}>
            Add New Card
          </Button>
        </Fragment>
      )}
      <AddCardModal
        isVisible={isAddCardModalVisible}
        onClose={() => setIsAddCardModalVisible(false)}
      />

      <EnrollStatusModal
        isVisible={showEnroll}
        onClose={() => {
          navigateWithName('CourseDetails', {id: route?.params?.item?.id});
          setShowEnroll(false);
        }}
      />
    </Fragment>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  margin: {marginBottom: 20},

  flatList: {overflow: 'visible'},

  mb: {marginBottom: 16},
});
