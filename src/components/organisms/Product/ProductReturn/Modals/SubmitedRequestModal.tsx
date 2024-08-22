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

const SubmitedRequestModal = ({id, onClose}) => {
  const {navigateWithName,} = useNavigate();

  return (
    <CustomActionSheet isVisible={id !== null} onClose={onClose}>
      <CheckIcon
        style={styles.checkIcon}
        color={getColor({color: 'green.500'})}
      />

      <Typography color={'green.500'} style={styles.title}>
        Return Request Submitted!
      </Typography>
      <Typography color={'gray.400'} style={styles.description}>
        Return Code: {id}
        {'\n'}
        Please check your email to receive the Return Label. As soon as we
        received the product, you’ll get the money.
      </Typography>
      <Button onPress={() => navigateWithName("order history")} style={styles.returnButton}>
        <Typography color={'#fff'} style={styles.buttonText}>
          Return to Orders
        </Typography>
      </Button>
    </CustomActionSheet>
  );
};

const styles = StyleSheet.create({
  checkIcon: {
    width: 50,
    height: 60,
    alignSelf: 'center',
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    margin: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    margin: 16,
    marginBottom: 32,
  },
  returnButton: {
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

export default SubmitedRequestModal;
