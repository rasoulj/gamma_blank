import React from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {CloseIcon, getColor, Typography} from '~/components/elemental';

function ModalContainer({
  isVisible,
  onClose,
  children,
  title,
  backdropColor,
  backgroundColor,
  hasCloseIcon = true,
}: {
  hasCloseIcon?: boolean;
  isVisible: boolean;
  onClose?: any;
  children: any;
  title?: string;
  onModalHide?: any;
  backdropColor?: string;
  backgroundColor?: string;
}) {
  return (
    <Modal
      animationType="fade"
      transparent
      style={{backgroundColor: getColor({color: 'background.500'})}}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: backdropColor || '#B3BFC16B'},
          ]}>
          <View
            style={[
              styles.modalInnerContainer,
              {backgroundColor: backgroundColor || '#FCFCFC'},
            ]}>
            {onClose && (
              <View
                style={{
                  minWidth: '80%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <Typography style={{fontWeight: 'bold'}}>{title}</Typography>

                {hasCloseIcon && (
                  <TouchableOpacity onPress={onClose}>
                    <CloseIcon size={28} />
                  </TouchableOpacity>
                )}
              </View>
            )}
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInnerContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    backgroundColor: '#FCFCFC',
  },
});

export default ModalContainer;
