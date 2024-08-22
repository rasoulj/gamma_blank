import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ModalContainer} from '~/components';
import {SlashIconSet, Typography, View, scale} from '~/components/elemental';
import {getColor} from '~/utils/helper/theme.methods';

const SuccessBlockModal = ({isBlocked, isVisible, onClose}) => {
  return (
    <ModalContainer isVisible={isVisible}>
      <View style={styles.container}>
        <SlashIconSet width={48} height={48} strokeWidth={4} />
        <Typography
          marginY="6"
          color="gray.800"
          fontSize="xl"
          fontWeight="600">{`User ${
          isBlocked ? 'Blocked' : 'Unblocked'
        }!`}</Typography>
        <TouchableOpacity onPress={onClose} style={styles.btnContainer}>
          <Typography color="gray.50" fontWeight="700">
            Done
          </Typography>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};

export default SuccessBlockModal;

const styles = StyleSheet.create({
  btnContainer: {
    height: 36,
    backgroundColor: getColor({color: 'primary.500'}),
    width: scale(144),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
  },
});
