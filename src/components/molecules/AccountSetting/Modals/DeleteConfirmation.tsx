import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  Input,
  Layer,
  Typography,
  globalBorderRadius,
  useNavigate,
} from '~/components/elemental';
import {useQueryClient} from 'react-query';

const DeleteConfirmatonModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {navigateWithName} = useNavigate();
  const queryClient = useQueryClient();
  const [deletText, setDeleteText] = useState('');

  const removeItem = () => {};
  return (
    <CustomActionSheet
      title="Delete Account?"
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
          <Typography
            style={{
              position: 'relative',
              display: 'flex',
              marginBottom: 16,
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '500',
            }}>
            This action cannot be undone Type “delete” to confirm
          </Typography>
          <Input style={{marginBottom: 16}} onChangeText={setDeleteText} />
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
              style={{position: 'relative', width: '47%', height: 36}}
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
              disabled={deletText.toLocaleLowerCase() !== 'delete'}
              style={{position: 'relative', width: '47%', height: 36}}
              bgColor={
                deletText.toLocaleLowerCase() !== 'delete'
                  ? 'gray.400'
                  : 'error.500'
              }
              onPress={e => [removeItem(), onClose()]}>
              <Typography
                color={'#fff'}
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

export default DeleteConfirmatonModal;

const styles = StyleSheet.create({});
