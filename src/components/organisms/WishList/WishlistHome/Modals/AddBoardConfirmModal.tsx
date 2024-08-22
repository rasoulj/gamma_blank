import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  Success2Icon,
  Typography,
  getColor,
} from '~/components/elemental';

const AddBoardConfirmModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: getColor({color: 'background.500'}),
          borderRadius: 15,
        }}>
        <>
          <Success2Icon style={{marginTop: 16}} />
          <Typography
            style={{fontWeight: '600', fontSize: 16, lineHeight: 24}}
            color={'#39DA2C'}
            my={4}>
            New Board Saved!
          </Typography>
        </>

        <Button
          onPress={onClose}
          borderRadius={12}
          mt={4}
          mb={10}
          width="40%"
          style={{height: 36}}>
          <Typography
            color={'background.500'}
            style={{fontSize: 14, fontWeight: '700', lineHeight: 16}}>
            Done
          </Typography>
        </Button>
      </View>
    </CustomActionSheet>
  );
};

export default AddBoardConfirmModal;

const styles = StyleSheet.create({});
