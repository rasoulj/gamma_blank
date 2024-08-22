import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {getColor} from '~/utils/helper/theme.methods';
import {Button, CheckIcon, Typography} from '~/components/elemental';

const SuccessModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <CheckIcon
        style={styles.checkIcon}
        color={getColor({color: 'green.500'})}
      />

      <Typography color={'green.500'} style={styles.successTitle}>
        Cancelation Submitted!
      </Typography>
      <Typography color={'gray.400'} style={styles.successDescription}>
        Your Money will return to your account.
      </Typography>
      <Button onPress={() => onClose()} style={styles.doneButton}>
        <Typography color={'#fff'} style={styles.buttonText}>
          Done
        </Typography>
      </Button>
    </CustomActionSheet>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  checkIcon: {
    width: 50,
    height: 60,
    alignSelf: 'center',
    margin: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    margin: 16,
  },
  successDescription: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    margin: 16,
    marginBottom: 32,
  },
  doneButton: {
    width: 160,
    height: 36,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
});
