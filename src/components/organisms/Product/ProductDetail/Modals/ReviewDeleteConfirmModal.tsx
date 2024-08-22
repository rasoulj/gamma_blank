import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useQueryClient } from 'react-query';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import { Button, Layer, Typography } from '~/components/elemental';
import { useRemoveRate, useRemoveReview } from '../../hook';

const ReviewDeleteConfirmModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useRemoveReview();
  const { mutate: mutateRate, isLoading: isLoadingRate } = useRemoveRate();

  const removeReview = () => {
    const input = { productId: item?.productId, userId: item?.user?.id, rate: 0 };
    mutate(
      { reviewId: item.id },
      {
        onSuccess(data, variables, context) {
          mutateRate(
            { input },
            {
              onSuccess(data, variables, context) {
                queryClient.invalidateQueries(['getProducts']);
                queryClient.invalidateQueries(['getProductRatings']);
                onClose();
              },
            },
          );
        },
      },
    );
  };
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Layer style={styles.layer}>
          <Typography style={styles.confirmationText}>Confirmation</Typography>
          <Typography style={styles.confirmationMessage}>
            Are you sure you want to delete this review?
          </Typography>
          <Layer style={styles.buttonContainer} data-parent="content-delete-layer">
            <Button
              style={styles.button}
              variant="outline"
              data-parent="button_box"
              onPress={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              isLoading={isLoading || isLoadingRate}
              style={styles.button}
              colorScheme="error.500"
              bgColor="error.500"
              variant="solid"
              data-parent="button_box"
              onPress={e => removeReview()}
            >
              Delete
            </Button>
          </Layer>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default ReviewDeleteConfirmModal;

const styles = StyleSheet.create({
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
  confirmationText: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 8,
  },
  confirmationMessage: {
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
  button: {
    position: 'relative',
    borderRadius: 10,
    width: '47%',
  },
});
