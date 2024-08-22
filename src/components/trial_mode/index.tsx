import React, {useState} from 'react';
import RNExitApp from 'react-native-exit-app';
import Modal from 'react-native-modal';
import {VStack, Text, Button} from '~/components/elemental';

const IsTrialModal = ({expireDate}: {expireDate?: Date}) => {
  const today = new Date();
  const daysToExpire =
    (expireDate.valueOf() - today.valueOf()) / (24 * 60 * 60 * 1000);
  const [isVisible, setIsVisible] = useState(true);
  const numberOfDays = parseInt(daysToExpire.toFixed(0)) || 0;
  const isExpired = numberOfDays < 0;

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={1}
      animationIn="fadeIn"
      onBackButtonPress={close}>
      <VStack
        space="6"
        bg={isExpired ? 'red.200' : 'yellow.100'}
        px="4"
        py="6"
        borderRadius="2xl"
        justifyContent="center"
        alignItems="center">
        <Text textAlign="center" color="#000000">
          {isExpired
            ? 'Your trial version has expired. Please visit your panel to upgrade to the unlimited version.'
            : `Your trial version will expire in ${numberOfDays} days. Please visit your panel to upgrade to the unlimited version.`}
        </Text>

        <Button
          onPress={close}
          style={[
            {
              width: '50%',
            },
            isExpired && {
              backgroundColor: 'red',
            },
          ]}>
          <Text color="white">OK!</Text>
        </Button>
      </VStack>
    </Modal>
  );

  function close() {
    if (isExpired) {
      RNExitApp.exitApp();
    } else {
      setIsVisible(false);
    }
  }
};

export default IsTrialModal;
