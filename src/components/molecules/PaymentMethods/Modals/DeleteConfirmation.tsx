import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Layer, Typography, useRoute, useToast} from '~/components/elemental';
import {usePaymentDeletePaymentMethod, useUpdateShoppingCardStatus} from '../hook';

const DeleteConfirmatonModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = usePaymentDeletePaymentMethod();
  const {mutate:mutateUpdateShopping, isLoading: isLoadingShopping} = useUpdateShoppingCardStatus();

  const route:any = useRoute()
  
  const {toast} = useToast();
  const deletePaymentMethod = () => {
    const input = {
      id: route?.params?.item?.id,
      paymentMethod: "",
    };

    mutateUpdateShopping(
      {input},
      {
        onSuccess(data) {
          console.log(data);
          mutate(
            {paymentMethodId: item?.id},
            {
              onSuccess(data: any, variables, context) {
                if (data?.paymentStripe_deletePaymentMethod?.value === 'NotAllowd') {
                  toast({
                    message: 'Your address is invalid, please check your address',
                    type: 'error',
                    containerStyle: styles.toastContainer,
                  });
                }
                queryClient.invalidateQueries(['getPaymentMethods']);
              },
            },
          );
          queryClient.refetchQueries(['getShoppingCards']);
        },
      },
    );
   
  };
  return (
    <CustomActionSheet
      title="Confirmation"
      isVisible={isVisible}
      onClose={onClose}>
      <View
        style={styles.container}>
        <Layer style={styles.containerText}>
          <Typography
            style={{
              position: 'relative',
              marginTop: 23,
              marginBottom: 32,
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'left',
              fontSize: 17,
            }}>
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
              isLoading={isLoading || isLoadingShopping}
              style={styles.deleteButton}
              colorScheme="error.500"
              bgColor="error.500"
              variant="solid"
              onPress={e => [deletePaymentMethod(), onClose()]}>
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

export default DeleteConfirmatonModal;

const styles = StyleSheet.create({
  toastContainer: {top: 70},
  container:{
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  containerText:{position: 'relative', marginLeft: 16, marginRight: 16},
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
