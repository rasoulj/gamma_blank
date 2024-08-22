import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  Layer,
  Typography,
  useNavigate,
  useToast,
} from '~/components/elemental';
import {useDeletePromotion} from '../../hook';

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
  const {mutate: mutateRemovePromotion, isLoading} = useDeletePromotion();
  const {toast} = useToast();
  const removeProduct = () => {
    mutateRemovePromotion(
      {promotionId: item?.id},
      {
        onSuccess(data: any, variables, context) {
          if (data?.ecommerce_deletePromotion?.status?.value === 'NotFound') {
            toast({
              message: 'This promotion already removed',
              type: 'error',
              containerStyle: styles.toastContainer,
            });
          }
          navigateWithName('home');
          queryClient.invalidateQueries(['getPromotion']);
          onClose();
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
        <Layer style={styles.textContainer}>
          <Typography
            style={styles.text}>
            Are you sure you want to delete this promotion?
          </Typography>
          <Layer
            style={styles.buttonContainer}
            data-parent="content-delete-layer">
            <Button
              style={styles.button}
              variant="outline"
              data-parent="button_box"
              onPress={() => {
                onClose();
              }}>
              <Typography
                color={'primary.500'}
                style={styles.buttonText}>
                Cancel
              </Typography>
            </Button>
            <Button
              isLoading={isLoading}
              style={styles.button}
              colorScheme="error.500"
              bgColor="error.500"
              variant="solid"
              data-parent="button_box"
              onPress={e => removeProduct()}>
              <Typography
                color={'background.500'}
                style={styles.buttonText}>
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
  toastContainer: {top: 70},
  container:{
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
  },
  textContainer:{position: 'relative', marginLeft: 20, marginRight: 20},
  text:{
    position: 'relative',
    marginTop: 23,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 17,
  },
  buttonContainer:{
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  button:{
    position: 'relative',
    width: '47%',
    height: 36,
  },
  buttonText:{fontSize: 14, fontWeight: '700', lineHeight: 16}
});
