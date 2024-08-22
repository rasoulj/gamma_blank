import React from 'react';
import {
  Button,
  HStack,
  Layer,
  Typography,
  VStack,
  useNavigate,
} from '~/components/elemental';
import styles from './styles';
import useAuthStore from '~/stores/authStore';
import {appFormatDate} from '~/utils/helper';

const Success = ({
  paymentResult,
  cardNumberType,
}: {
  paymentResult: any;
  cardNumberType?: string;
}) => {
  const {navigateWithName} = useNavigate();
  const user = useAuthStore(state => state?.user);
  const paymentMethod = paymentResult?.paymentMethod
    ? JSON.parse(paymentResult?.paymentMethod)
    : null;

  return (
    <>
      <Layer style={styles.successContainer}>
        <VStack space="4" style={styles.shadowContainer}>
          <HStack style={styles.cardContainer}>
            <Typography style={styles.infoText}>Card</Typography>
            <Typography
              style={{...styles.infoText, textTransform: 'uppercase'}}>
              {paymentMethod?.brand || cardNumberType}
              ****
              {paymentMethod?.last4 || paymentResult?.last4CardNumber}
            </Typography>
          </HStack>
          <HStack style={styles.cardContainer}>
            <Typography style={styles.infoText}>Order Date</Typography>
            <Typography style={styles.infoText}>
              {appFormatDate(
                paymentResult?.paymentDate ||
                  paymentResult?.createdDate ||
                  paymentResult?.paymentDate,
                'DD.MM.YYYY hh:mm',
              )}
            </Typography>
          </HStack>
          <HStack style={styles.cardContainer}>
            <Typography style={styles.infoText}>Order No</Typography>
            <Typography style={styles.infoText}>
              {paymentResult?.id || paymentResult?.receiptNumber}
            </Typography>
          </HStack>
        </VStack>

        <Typography style={styles.thankYouText}>
          Thank you for your purchase. Your order has been successfully
          processed. An email receipt has been sent to{' '}
          <Typography style={styles.boldText}>{user?.email}</Typography>
        </Typography>
      </Layer>
      <Button
        rounded="full"
        variant="solid"
        width="100%"
        style={styles.paymentButton}
        py={3}
        bottom={0}
        _text={{
          fontWeight: 'bold',
        }}
        onPress={() => navigateWithName('home')}>
        Return to Home
      </Button>
    </>
  );
};

export default Success;
