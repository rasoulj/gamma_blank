import {HStack} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useQueryClient} from 'react-query';
import ShoppingCardIcon from '~/assets/icons/CustomIcons/ShoppingCard.icon';
import {Layer, MoreIconSet, Typography, getColor} from '~/components/elemental';
import PaymentMethodsModal from './Modals/PaymentMethodsModal';
import {usePaymentUpdatePaymentMethod} from './hook';

const PaymentMethodItem = ({item, cardData}) => {
  const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const {mutate} = usePaymentUpdatePaymentMethod();

  const submit = () => {
    const input = {
      id: item?.id,
      createForApsy: true,
      saveForFuturePurchases: true,
    };
    mutate(
      {input},
      {
        onSuccess(data) {
          cardData?.(input);
          queryClient.invalidateQueries(['getPaymentMethods']);
          queryClient.refetchQueries(['getShoppingCard']);
        },
      },
    );
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.touchable,
        borderColor: getColor({
          color: item?.saveForFuturePurchases
            ? 'primary.500'
            : 'background.500',
        }),
      }}
      onPress={submit}>
      <HStack style={styles.shadowContainer}>
        <HStack style={{alignItems: 'center'}}>
          <ShoppingCardIcon />

          <Layer style={styles.cardContainer}>
            <Typography style={styles.brandText}>{item?.brand}</Typography>
            <Typography color={'gray.500'}>
              •••• •••• •••• {item?.last4}
            </Typography>
          </Layer>
        </HStack>
        <TouchableOpacity onPress={() => [setIsOptionModalVisible(true)]}>
          <MoreIconSet style={styles.moreIcon} />
        </TouchableOpacity>
      </HStack>
      <PaymentMethodsModal
        item={item}
        isVisible={isOptionModalVisible}
        onClose={() => setIsOptionModalVisible(false)}
      />
    </TouchableOpacity>
  );
};

export default PaymentMethodItem;

const styles = StyleSheet.create({
  shadowContainer: {
    padding: 16,
    backgroundColor: getColor({color: 'background.500'}),
    shadowColor: getColor({color: 'gray.500'}),
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 10,
    marginHorizontal: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandText: {
    textTransform: 'capitalize',
  },
  touchable: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  cardContainer: {marginLeft: 8},
  moreIcon: {transform: [{rotate: '90deg'}]},
});
