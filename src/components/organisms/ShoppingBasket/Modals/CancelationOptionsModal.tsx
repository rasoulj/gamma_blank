import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  ArrowRightIcon,
  ArrowRightIconSet,
  Divider,
  Typography,
  useNavigate,
} from '~/components/elemental';
import CancelationInputModal from './CancelationInputModal';
import {useRemoveItemFromShoppingCard, useRemoveItemShoppingCard, useUpdateShoppingCard} from '../hooks';
import SuccessModal from './SuccessModal';
import {useQueryClient} from 'react-query';

const options = [
  'Change of Mind',
  'Wrong Item Ordered',
  'Shipping Delay',
  'Price Discrepancy',
  'Product Unavailability',
  'Dissatisfaction with Product Description',
  'Better Product Reviews',
  'Shipping Cost',
];

const CancelationOptionsModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {navigation} = useNavigate();
  const queryClient = useQueryClient();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const {mutate: mutateRemove, isLoading: isLoadingRemove} =
    useRemoveItemShoppingCard();

  const cancelOrder = des => {
    setIsSuccessModalVisible(true)
    mutateRemove(
      {shoppingCardDetailId: item?.id},
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(['getShoppingCards'], {
            exact: false,
          });
          setIsSuccessModalVisible(true)
        },
      },
    );
  };
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      {options?.map(i => {
        return (
          <View key={i}>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => cancelOrder(i)}>
              <Typography style={styles.optionText}>{i}</Typography>
              <ArrowRightIconSet />
            </TouchableOpacity>
            <Divider />
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => setIsInputVisible(true)}>
        <Typography style={styles.optionText}>Other</Typography>
        <ArrowRightIconSet />
      </TouchableOpacity>
      <CancelationInputModal
        item={item}
        isVisible={isInputVisible}
        onClose={() => [setIsInputVisible(false), onClose()]}
      />
      <SuccessModal
        isVisible={isSuccessModalVisible}
        onClose={() => [setIsSuccessModalVisible(false), onClose()]}
      />
    </CustomActionSheet>
  );
};

export default CancelationOptionsModal;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    margin: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    padding: 10,
  },
});
