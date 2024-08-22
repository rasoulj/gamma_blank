import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  Button,
  CheckIcon,
  Typography,
  getColor,
  useNavigate,
} from '~/components';

const SubmitedRequestModal = ({isVisible, onClose}) => {
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <CheckIcon
        style={styles.checkIcon}
        color={getColor({color: 'green.500'})}
      />
      <Typography
        color={getColor({color: 'green.500'})}
        style={styles.titleText}>
        Rate & Review Submitted!
      </Typography>
      <Typography color={'gray.400'} style={styles.descriptionText}>
        Thank you for your feedback
      </Typography>
      <Button
        style={styles.doneButton}
        data-parent="button_box"
        onPress={onClose}>
        <Typography
          color={getColor({color: 'background.500'})}
          style={styles.doneButtonText}>
          Done
        </Typography>
      </Button>
    </CustomActionSheet>
  );
};

export default SubmitedRequestModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: 50,
    height: 60,
    alignSelf: 'center',
    margin: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    margin: 16,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    margin: 16,
    marginBottom: 32,
  },
  doneButton: {
    position: 'relative',
    width: '40%',
    height: 36,
    alignSelf: 'center',
  },
  doneButtonText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
});
