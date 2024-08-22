import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ModalContainer, TickIcon} from '~/components';
import {Typography, View, scale} from '~/components/elemental';
import {getColor} from '~/utils/helper/theme.methods';

const SuccessModal = ({isVisible, onClose, fullName}) => {
  return (
    <ModalContainer isVisible={isVisible}>
      <View style={styles.container}>
        <TickIcon color="success.500" />
        <Typography
          color="success.500"
          fontSize="lg"
          mt="8"
          textAlign="center"
          fontWeight="600">
          Your request has been
        </Typography>
        <Typography
          color="success.500"
          fontSize="lg"
          textAlign="center"
          fontWeight="600">
          successfully sent
        </Typography>
        <Typography
          color="gray.500"
          fontSize="sm"
          textAlign="center"
          mt="4"
          fontWeight="500">
          Your selections will be automatically saved, and{' '}
          <Typography fontWeight="700" color="gray.800">
            {fullName}
          </Typography>{' '}
          will be notified of your chosen time.
        </Typography>
        <TouchableOpacity onPress={onClose} style={styles.btnContainer}>
          <Typography color="gray.50" fontWeight="700">
            Done
          </Typography>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  btnContainer: {
    height: 36,
    backgroundColor: getColor({color: 'primary.500'}),
    width: scale(144),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 16,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
  },
});
