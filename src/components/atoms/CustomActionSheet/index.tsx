import React, {memo} from 'react';
import {
  Keyboard,
  Modal,
  ModalBaseProps,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Layer, Typography, getColor} from '~/components/elemental';
import {useKeyboardHook} from './hooks';

interface MProps extends ModalBaseProps {
  isVisible: boolean;
  onClose?: any;
  children: any;
  title?: string;
  onModalHide?: any;
  backdropColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}
function CustomActionSheet({
  isVisible,
  onClose,
  children,
  title,
  backdropColor,
  backgroundColor,
  style,
  ...props
}: MProps) {
  const {isKeyboardVisible, keyboardHeight} = useKeyboardHook();

  return (
    <Modal
      animationType="fade"
      transparent
      style={styles.modal}
      visible={isVisible}
      onRequestClose={onClose}
      {...props}>
      <TouchableWithoutFeedback onPress={() => [Keyboard.dismiss(), onClose()]}>
        <View style={[styles.modalContainer]}>
          <Animated.View
            entering={FadeIn.duration(800)}
            style={styles.animated}
          />
          <View
            style={[
              styles.modalInnerContainer,
              {
                backgroundColor:
                  backgroundColor || getColor({color: 'background.500'}),
              },
            ]}>
            {onClose && (
              <View style={styles.closeLineContainer}>
                <TouchableWithoutFeedback onPress={onClose}>
                  <Layer style={styles.closeLine} />
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Layer
        style={[
          styles.childContainer,
          {
            marginBottom:
              Platform.OS === 'ios'
                ? isKeyboardVisible
                  ? keyboardHeight
                  : 10
                : 0,
            marginTop: -2,
          ...style,
          },
        ]}>
        {title && <Typography style={styles.title}>{title}</Typography>}
        {children}
      </Layer>
    </Modal>
  );
}

export default memo(CustomActionSheet);

const styles = StyleSheet.create({
  modal: {backgroundColor: getColor({color: 'background.500'})},
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalInnerContainer: {
    zIndex: 3,
    width: '100%',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    padding: 16,
  },
  animated: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: getColor({color: 'gray.800'}) + '80',
  },
  closeLineContainer: {
    minWidth: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeLine: {
    width: 85,
    height: 7,
    backgroundColor: getColor({color: 'gray.300'}),
    borderRadius: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  childContainer: {
    backgroundColor: getColor({color: 'background.500'}),
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
