import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Layer, Typography, useToast} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import useShoppingBasketStore from '~/stores/shoppingBascketStore';
import {useRemoveItemShoppingCard} from '../hooks';

const DeleteItemConfirmModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const {toast} = useToast();

  const setShoppingBasketList = useShoppingBasketStore(
    state => state?.setShoppingBasketList,
  );
  const shoppingBasketList = useShoppingBasketStore(
    state => state?.shoppingBasketList,
  );
  const token = useAuthStore(state => state?.token);

  const {mutate: mutateRemove, isLoading: isLoadingRemove} =
    useRemoveItemShoppingCard();

  const removeItem = () => {
    if (!token) {
      setShoppingBasketList([
        ...shoppingBasketList.filter(i => i?.productId !== item?.product?.id),
      ]);
    } else {
      mutateRemove(
        {shoppingCardDetailId: item?.id},
        {
          onSuccess(data: any, variables, context) {
            if (
              data?.ecommerce_removeFromShoppingCard?.value ===
              'NotFound'
            ) {
              toast({
                message: 'This product already removed',
                type: 'error',
                containerStyle: styles.toastContainer,
              });
            } else if (
              data?.ecommerce_removeFromShoppingCard?.value ===
              'NotAllowd'
            ) {
              toast({
                message: 'You do not have access to delete shipping card',
                type: 'error',
                containerStyle: styles.toastContainer,
              });
            }
            onClose();
            queryClient.invalidateQueries(['getShoppingCards'], {
              exact: false,
            });
          },
        },
      );
    }
  };
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Layer style={styles.layer}>
          <Typography style={styles.title}>Confirmation</Typography>
          <Typography style={styles.message}>
            Are you sure you want to delete this item?
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
              onPress={removeItem}>
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

export default DeleteItemConfirmModal;

const styles = StyleSheet.create({
  toastContainer: {top: 70},
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
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
