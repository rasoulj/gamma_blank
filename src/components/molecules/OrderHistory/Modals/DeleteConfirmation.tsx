import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Button, Layer, Typography, useNavigate} from '~/components/elemental';
import {useQueryClient} from 'react-query';
import {useUpdateShoppingCardStatus} from '../hook';

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

  const {mutate, isLoading} = useUpdateShoppingCardStatus();
  const removeItem = () => {
    const input = {
      id: item?.id,
      orderStatus: 'CANCELLED',
    };
    mutate(input, {
      onSuccess(data, variables, context) {
        queryClient.refetchQueries(['getPosts']);
        console.log(data);
      },
    });
  };
  return (
    <CustomActionSheet
      title="Confirmation"
      isVisible={isVisible}
      onClose={onClose}>
      <View
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 10,
          width: '100%',
        }}>
        <Layer style={{position: 'relative', marginLeft: 20, marginRight: 20}}>
          {/* <Typography
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
          </Typography> */}
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
            Are you sure you want to cancel this order?
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
              style={{position: 'relative', width: '47%'}}
              variant="outline"
              data-parent="button_box"
              onPress={() => {
                onClose();
              }}>
              Cancel
            </Button>
            <Button
              style={{position: 'relative', width: '47%'}}
              colorScheme="error.500"
              bgColor="error.500"
              variant="solid"
              data-parent="button_box"
              onPress={e => [removeItem(), onClose()]}>
              Delete
            </Button>
          </Layer>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default DeleteConfirmatonModal;

const styles = StyleSheet.create({});
