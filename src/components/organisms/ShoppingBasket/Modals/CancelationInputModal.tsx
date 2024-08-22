import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {Button, Input, Layer, Typography, useNavigate, useToast} from '~/components';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {useRemoveItemShoppingCard} from '../hooks';
import SuccessModal from './SuccessModal';

const CancelationInputModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [text, setText] = useState('');

  const {mutate: mutateRemove} =
    useRemoveItemShoppingCard();
  const {toast} = useToast()
  const cancelOrder = des => {
    mutateRemove(
      {shoppingCardDetailId: item?.id},
      {
        onSuccess(data:any, variables, context) {
          if (
            data?.ecommerce_removeItemFromShoppingCard?.value ===
            'NotFound'
          ) {
            toast({
              message: 'This product already removed',
              type: 'error',
              containerStyle: styles.toastContainer,
            });
          } else if (
            data?.ecommerce_removeItemFromShoppingCard?.value ===
            'NotAllowd'
          ) {
            toast({
              message: 'You do not have access to delete shipping card',
              type: 'error',
              containerStyle: styles.toastContainer,
            });
          }
          queryClient.invalidateQueries(['getShoppingCards'], {
            exact: false,
          });
          onClose();
        },
      },
    );
  };

  return (
    <CustomActionSheet title="Cancel" isVisible={isVisible} onClose={onClose}>
      <Input onChangeText={setText} placeholder="Write here..." multi />
      <Layer style={styles.buttonContainer} data-parent="content-delete-layer">
        <Button
          style={styles.cancelButton}
          variant="outline"
          onPress={() => onClose()}>
          <Typography color={'primary.500'} style={styles.cancelButtonText}>
            Cancel
          </Typography>
        </Button>
        <Button
          style={styles.sendButton}
          colorScheme="error.500"
          bgColor="error.500"
          variant="solid"
          onPress={() => cancelOrder(text)}>
          <Typography color={'background.500'} style={styles.sendButtonText}>
            Send
          </Typography>
        </Button>
      </Layer>
      <SuccessModal
        isVisible={isSuccessModalVisible}
        onClose={() => [setIsSuccessModalVisible(false), onClose()]}
      />
    </CustomActionSheet>
  );
};

export default CancelationInputModal;

const styles = StyleSheet.create({
  toastContainer: {top: 70},
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
    marginTop: 32,
  },
  cancelButton: {
    position: 'relative',
    width: '45%',
    height: 36,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  sendButton: {
    position: 'relative',
    width: '45%',
    height: 36,
  },
  sendButtonText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16,
  },
});
