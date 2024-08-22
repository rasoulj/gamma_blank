import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {TickIconSet} from '~/assets/iconset';
import {getColor} from '~/utils/helper/theme.methods';
import {Button, Typography, useNavigate} from '~/components/elemental';

const BookingPaymentSuccess = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {navigateWithName} = useNavigate();
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={{alignItems: 'center'}}>
        <TickIconSet width={108} height={108} color={'#39DA2C'} />
        <Typography
          color={'success.500'}
          style={{fontSize: 18, fontWeight: '600'}}>
          Success!
        </Typography>
        <Typography
          color={'gray.500'}
          style={{fontSize: 16, fontWeight: '600', marginVertical: 16}}>
          Your service has been booked.
        </Typography>
        <Button onPress={() => navigateWithName('Home')}>
          See on Projects
        </Button>
      </View>
    </CustomActionSheet>
  );
};

export default BookingPaymentSuccess;

const styles = StyleSheet.create({});
