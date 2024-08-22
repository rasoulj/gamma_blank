import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Layer, Typography, useNavigate} from '~/components/elemental';
import {useRemoveProduct} from '../../hook';
import {useQueryClient} from 'react-query';

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
  const {mutate: mutateRemoveProduct, isLoading} = useRemoveProduct();

  const removeProduct = () => {
    mutateRemoveProduct(
      {productId: item?.id},
      {
        onSuccess(data, variables, context) {
          navigateWithName('home');
          queryClient.invalidateQueries(['getProducts']);
          onClose();
        },
      },
    );
  };
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 10,
          width: '100%',
        }}>
        <Layer style={{position: 'relative', marginLeft: 20, marginRight: 20}}>
          <Typography
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 17,
              marginTop: 8,
            }}>
            Confirmation
          </Typography>
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
            Are you sure you want to delete this product?
          </Typography>
          <Layer
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
              width: '100%',
            }}
            data-parent="content-delete-layer">
            <Button
              style={{
                position: 'relative',
                width: '47%',
                height: 36,
              }}
              variant="outline"
              data-parent="button_box"
              onPress={() => {
                onClose();
              }}>
              <Typography
                color={'primary.500'}
                style={{fontSize: 14, fontWeight: '700', lineHeight: 16}}>
                Cancel
              </Typography>
            </Button>
            <Button
              isLoading={isLoading}
              style={{
                position: 'relative',
                width: '47%',
                height: 36,
              }}
              colorScheme="error.500"
              bgColor="error.500"
              variant="solid"
              data-parent="button_box"
              onPress={e => removeProduct()}>
              <Typography
                color={'background.500'}
                style={{fontSize: 14, fontWeight: '700', lineHeight: 16}}>
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

const styles = StyleSheet.create({});
