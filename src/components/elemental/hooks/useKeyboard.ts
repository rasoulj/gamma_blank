import React, {useEffect} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

interface IOutput {
  keyboardHeight: number;
  keyboardVisible: boolean;
}

const useKeyboard = (): IOutput => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [keyboardShow, setKeyboardShow] = React.useState(false);
  const onKeyboardShow = (event: KeyboardEvent) => {
    setKeyboardHeight(event.endCoordinates.height);
    setKeyboardShow(true);
  };

  const onKeyboardHide = () => {
    setKeyboardHeight(0);
    setKeyboardShow(false);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });
  return {
    keyboardHeight,
    keyboardVisible: keyboardShow,
  };
};

export default useKeyboard;
