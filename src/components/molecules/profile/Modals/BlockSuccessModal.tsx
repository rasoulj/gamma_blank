import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BlockIcon,
  Button,
  Layer,
  Modal,
  Success2Icon,
  Typography,
  getColor,
} from '~/components/elemental';

const BlockSuccessModal = ({
  isVisible,
  onClose,
  userName,
}: {
  isVisible: boolean;
  onClose: () => void;
  userName: string;
}) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <Modal.Content justifyContent={'center'} borderRadius={18} width={'90%'}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: getColor({color: 'background.500'}),
            borderRadius: 15,
            marginTop: 16,
          }}>
          <>
            <BlockIcon width={40} height={40} style={{marginTop: 16}} />
            <Typography fontWeight={'bold'} my={4}>
              {userName} Blocked!
            </Typography>
          </>
          <Button
            onPress={onClose}
            borderRadius={12}
            mt={4}
            mb={10}
            width="40%">
            Done
          </Button>
        </View>
      </Modal.Content>
    </Modal>
  );
};

export default BlockSuccessModal;

const styles = StyleSheet.create({});
