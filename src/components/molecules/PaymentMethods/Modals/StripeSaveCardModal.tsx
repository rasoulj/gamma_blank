import {
  CardForm,
  StripeProvider,
  createToken,
} from '@stripe/stripe-react-native';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useQueryClient } from 'react-query';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import { Button, Typography } from '~/components/elemental';
import {
  useGetApsyPublishedKey,
  usePaymentCreatePaymentMethod,
  usePaymentUpdatePaymentMethod,
} from '../hook';

type stripeSaveCardProps = {
  item?: any;
  publishableKey: string;
  isVisible: boolean;
  onClose: () => void;
};

const StripeSaveCardModal = ({
  item,
  publishableKey,
  isVisible,
  onClose,
}: stripeSaveCardProps) => {
  const queryClient = useQueryClient();
  const [isReady, setIsReady] = React.useState(false);
  const [publishable, setPublishable] = React.useState(publishableKey);

  const {data: dataApsyPublishedKey}:any = useGetApsyPublishedKey()

  const apsyPublishedKey = dataApsyPublishedKey?.paymentStripe_getApsyPublishableKey
  
  const {mutate: mutatePaymentMethod, isLoading} = item
    ? usePaymentUpdatePaymentMethod()
    : usePaymentCreatePaymentMethod();

  const getApsyToken = async() =>{
    setPublishable(apsyPublishedKey)
    const stripeApsyToken = await createToken({type: 'Card', name:"apsy"});
    return stripeApsyToken?.token?.id
  }

  
  const createTokenAndUpdateCard = async () => {
    const stripeToken = await createToken({type: 'Card'});
    const input = {
      token: stripeToken?.token?.id,
      apsyToken: await getApsyToken(),
      saveForFuturePurchases: true,
    };
    if (stripeToken) {
      mutatePaymentMethod(
        {input},
        {
          onSuccess(data, variables, context) {
            onClose();
            queryClient.refetchQueries(['getPaymentMethods']);
          },
        },
      );
    }
  };
  return (
    <CustomActionSheet
      title={item ? 'Edit Card' : 'Add Card'}
      isVisible={isVisible}
      onClose={onClose}
      style={styles.height}>
      <StripeProvider publishableKey={publishable}>
        <CardForm
          style={styles.cardField}
          placeholders={{number: '*****'}}
          role="banner"
          onFormComplete={details => {
            if (details.complete) {
              setIsReady(true);
            }
          }}
        />
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          style={styles.button}
          onPress={createTokenAndUpdateCard}
          bgColor={isReady ? 'primary.500' : 'primary.200'}
          _text={isReady ? {} : {color: 'gray.500'}}
          disabled={!isReady}>
          <Typography color={'background.500'} style={styles.buttonText}>
            Save
          </Typography>
        </Button>
      </StripeProvider>
    </CustomActionSheet>
  );
};

export default StripeSaveCardModal;

const styles = StyleSheet.create({
  cardField: {
    height: Platform.OS === 'android' ? 300 : 180,
    width: '100%',
    color: '#222',
  },
  button: {
    marginVertical: 10,
    marginTop: 30,
    height: 36,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  height: {height: 450},
});
