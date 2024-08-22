import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Divider,
  EditIconSet,
  Trash2Icon,
  Typography,
} from '~/components/elemental';
import AddCardModal from './AddCardModal';
import DeleteConfirmatonModal from './DeleteConfirmation';
import StripeSaveCardModal from './StripeSaveCardModal';
import { useGetPublishedKey } from '../hook';

const PaymentMethodsModal = ({
  item,
  isVisible,
  onClose,
}: {
  item;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [isAddCardModalVisible, setIsAddCardModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const {data}:any = useGetPublishedKey();

  return (
    <>
      <CustomActionSheet title="" isVisible={isVisible} onClose={onClose}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => [setIsDeleteModalVisible(true), onClose()]}>
          <Trash2Icon color="error.600" />
          <Typography color={'error.600'} style={styles.txt}>
            Delete
          </Typography>
        </TouchableOpacity>
      </CustomActionSheet>
      <StripeSaveCardModal
        item={item}
        publishableKey={data?.paymentStripe_getPublishableKey}
        isVisible={isAddCardModalVisible}
        onClose={() => setIsAddCardModalVisible(false)}
      />
      <DeleteConfirmatonModal
        item={item}
        isVisible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />
    </>
  );
};

export default PaymentMethodsModal;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  txt: {marginLeft: 8, fontWeight: 'bold'},
});
