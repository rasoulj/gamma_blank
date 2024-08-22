import {VStack} from 'native-base';
import React from 'react';
import {Modal, Platform} from 'react-native';
import {SearchLocationList, deviceHeight} from '~/components';
const LocationModal = ({isVisible, onClose, onLocationSelect}) => {
  const onClickBack = () => onClose();

  const onSubmitLocation = data => {
    onLocationSelect?.(data);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onClose}>
      <VStack
        flex="1"
        h={deviceHeight}
        background="background.200"
        pt={Platform.OS === 'ios' ? '12' : '0'}>
        <SearchLocationList
          onItemSelect={onSubmitLocation}
          onClickBack={onClickBack}
        />
      </VStack>
    </Modal>
  );
};

export default LocationModal;
