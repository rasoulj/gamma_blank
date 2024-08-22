import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Layer, Typography, useNavigate} from '~/components/elemental';
import {Button} from 'native-base';
import {useQueryClient} from 'react-query';

const DeleteConfirmModal = ({
  isVisible,
  onClose,
  removeItem,
}: {
  isVisible: boolean;
  onClose: () => void;
  removeItem: () => void;
}) => {
  const {navigateWithName} = useNavigate();
  const queryClient = useQueryClient();

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
            Are you sure you want to delete this item?
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
              style={{position: 'relative', borderRadius: 20, width: '47%'}}
              variant="outline"
              data-parent="button_box"
              onPress={() => {
                onClose();
              }}>
              Cancel
            </Button>
            <Button
              style={{position: 'relative', borderRadius: 20, width: '47%'}}
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

export default DeleteConfirmModal;

const styles = StyleSheet.create({});
