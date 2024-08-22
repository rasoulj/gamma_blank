import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ArrowRightIconSet, Typography} from '~/components/elemental';
import {formatPrice} from '~/utils/helper/formatPrice';

const PaymentItem = ({item}) => {
  return (
    <TouchableOpacity style={styles.paymentCard}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Typography style={{fontSize: 14, fontWeight: '700'}}>
          {item?.name}
        </Typography>
        <Typography
          color={'primary.500'}
          style={{fontSize: 18, fontWeight: '700'}}>
          ${formatPrice(item?.price)}
        </Typography>
      </View>
      <Typography
        style={{
          flex: 1,
          marginVertical: 8,
          fontSize: 14,
          fontWeight: '500',
        }}>
        {item?.description}
      </Typography>
      <ArrowRightIconSet style={{alignSelf: 'flex-end'}} />
    </TouchableOpacity>
  );
};

export default PaymentItem;

const styles = StyleSheet.create({
  paymentCard: {
    backgroundColor: '#fff',
    width: '100%',
    height: 170,
    borderRadius: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 5,
    padding: 16,
    marginVertical: 4,
  },
});
