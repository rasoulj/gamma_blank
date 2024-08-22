import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Button,
  Layer,
  Success2Icon,
  Typography,
  getColor,
} from '~/components/elemental';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import ModalContainer from '~/components/atoms/ModalContainer';

const ReportConfirmModal = ({
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
          <Typography fontWeight={'bold'} color={'#39DA2C'} my={4}>
            Report Submitted!
          </Typography>
          <Typography color={'gray.500'} fontWeight={'600'}>
            Thanks for letting us know.
          </Typography>
        </>

        <Button onPress={onClose} borderRadius={12} mt={4} mb={10} width="40%">
          Done
        </Button>
      </View>
    </CustomActionSheet>
  );
};

export default ReportConfirmModal;

const styles = StyleSheet.create({});
