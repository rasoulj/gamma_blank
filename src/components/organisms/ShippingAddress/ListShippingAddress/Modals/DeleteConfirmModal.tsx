import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Layer, Typography, useNavigate} from '~/components/elemental';
import {useQueryClient} from 'react-query';
import useShoppingBasketStore from '~/stores/shoppingBascketStore';
import useAuthStore from '~/stores/authStore';
import {useRemoveAddress} from '../../hook';

const DeleteConfirmModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {navigateWithName} = useNavigate();
  const queryClient = useQueryClient();

  const setShoppingBasketList = useShoppingBasketStore(
    state => state?.setShoppingBasketList,
  );
  const token = useAuthStore(state => state?.token);

  const {mutate: removeAddressMutate, isLoading: isLoadingRemove} =
    useRemoveAddress();
  const removeAddress = () => {
    removeAddressMutate(
      {entityId: item?.id},
      {
        onSuccess(data, variables, context) {
          queryClient.refetchQueries(['getOrderAddress']);
          onClose();
        },
      },
    );
  };

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Layer style={styles.layer}>
          <Typography style={styles.title}>Confirmation</Typography>
          <Typography style={styles.message}>
            Are you sure you want to delete this address?
          </Typography>
          <Layer style={styles.buttonContainer}>
            <Button
              style={styles.cancelButton}
              variant="outline"
              onPress={() => {
                onClose();
              }}>
              <Typography style={styles.cancelButtonText} color={'primary.500'}>
                Cancel
              </Typography>
            </Button>
            <Button
              isLoading={isLoadingRemove}
              style={styles.deleteButton}
              colorScheme="error.500"
              bgColor="error.500"
              variant="solid"
              onPress={removeAddress}>
              <Typography
                style={styles.deleteButtonText}
                color={'background.500'}>
                Delete
              </Typography>
            </Button>
          </Layer>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default DeleteConfirmModal;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: 10,
  },
  layer: {
    position: 'relative',
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 8,
  },
  message: {
    position: 'relative',
    marginTop: 23,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 17,
  },
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  cancelButton: {
    position: 'relative',
    flex: 1,
    marginRight: 16,
    height: 36,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  deleteButton: {
    position: 'relative',
    flex: 1,
    height: 36,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
});
