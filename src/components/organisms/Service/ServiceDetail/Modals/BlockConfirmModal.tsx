import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {Layer, Typography} from '~/components/elemental';
import {Button} from 'native-base';
import {useCreateBlockUser} from '../../hook';
import {useQueryClient} from 'react-query';

const BlockConfirmModal = ({
  item,
  isVisible,
  onClose,
}: {
  item: any;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const {mutate: createBlockUser, isLoading: createBlockUserLoading} =
    useCreateBlockUser();

  const handleBlockUser = () => {
    const input: any = {
      blockedUserId: item?.userId,
    };
    createBlockUser(
      {input},
      {
        onSuccess: success => {
          console.log('Success', success);
          onClose();
          queryClient.refetchQueries('getPostComments');
          queryClient.refetchQueries(['getContentProducts']);
        },
        onError: error => {
          console.log('error', error);
        },
      },
    );
  };
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View
        data-name="RelativeLayout"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 10,
          width: '100%',
        }}>
        <Layer
          data-name="Layer"
          style={{position: 'relative', marginLeft: 5, marginRight: 5}}>
          <Typography
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Block
          </Typography>
          <Typography
            style={{
              textAlign: 'center',
              fontSize: 17,
              marginTop: 16,
            }}>
            Are you sure you want to block this user?
          </Typography>
          <Layer
            data-id="button_box"
            data-name="Layer"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 10,
              marginTop: 50,
              width: '100%',
            }}
            data-parent="content-delete-layer">
            <Button
              data-id="cancel_btn"
              data-name="Button"
              style={{position: 'relative', borderRadius: 20, width: '45%'}}
              variant="outline"
              data-parent="button_box"
              onPress={() => {
                onClose();
              }}>
              Cancel
            </Button>
            <Button
              isLoading={createBlockUserLoading}
              data-id="delete_btn"
              data-name="Button"
              style={{position: 'relative', borderRadius: 20, width: '45%'}}
              colorScheme="error.500"
              bgColor="error.500"
              variant="solid"
              data-parent="button_box"
              onPress={e => {
                handleBlockUser();
              }}>
              Block
            </Button>
          </Layer>
        </Layer>
      </View>
    </CustomActionSheet>
  );
};

export default BlockConfirmModal;

const styles = StyleSheet.create({});
