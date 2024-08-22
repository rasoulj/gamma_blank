import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  Button,
  Layer,
  Success2Icon,
  Typography,
  getColor,
} from '~/components/elemental';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';

const ReportConfirmModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <>
          <Success2Icon style={styles.icon} />
          <Typography fontWeight={'bold'} color={'#39DA2C'} my={4}>
            Report Submitted!
          </Typography>
          <Typography color={'gray.500'} fontWeight={'600'}>
            Thanks for letting us know.
          </Typography>
        </>

        <Button style={styles.button} onPress={onClose}>
          <Typography
            color={'background.500'}
            style={styles.buttonText}>
            Done
          </Typography>
        </Button>
      </View>
    </CustomActionSheet>
  );
};

export default ReportConfirmModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColor({ color: 'background.500' }),
    borderRadius: 15,
  },
  icon: {
    marginTop: 16,
  },
  button: {
    width: '40%',
    marginVertical: 10,
    height: 36,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
});
