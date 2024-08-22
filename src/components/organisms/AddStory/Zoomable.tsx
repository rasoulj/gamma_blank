import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  PinchGestureHandler,
  State,
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const ZoomAndDragView = forwardRef(({inputRef}: {inputRef: any}, ref) => {
  const [visibleTextArea, setVisibleTextArea] = useState(true);
  const scale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const lastScale = useRef(1);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastOffset = {x: 0, y: 0};

  const onPressOut = () => {
    Keyboard.dismiss();
    if (inputRef?.current?.length === 0 || !inputRef?.current)
      setVisibleTextArea(false);
  };

  const onPinchEvent = Animated.event([{nativeEvent: {scale: pinchScale}}], {
    useNativeDriver: false,
  });

  const onPinchStateChange = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: Animated.multiply(lastScale.current, pinchScale),
        useNativeDriver: false,
      }).start();
    } else if (event.nativeEvent.state === State.END) {
      lastScale.current *= pinchScale._value;
    }
  };

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: false},
  );

  const onPanStateChange = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Keyboard.dismiss();
      translateX.setValue(lastOffset.x + event.nativeEvent.translationX);
      translateY.setValue(lastOffset.y + event.nativeEvent.translationY);
    } else if (event.nativeEvent.state === State.END) {
      lastOffset.x += event.nativeEvent.translationX;
      lastOffset.y += event.nativeEvent.translationY;
    }
  };

  useImperativeHandle(ref, () => ({
    onVisibleView: () => {
      setVisibleTextArea(true);
      setTimeout(() => {
        currentInputRef?.current?.focus();
      }, 200);
    },
  }));

  const onChangeText = value => (inputRef.current = value);
  const currentInputRef = useRef<TextInput>();

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={onPressOut}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}>
        <View style={styles.flex1}>
          {visibleTextArea && (
            <GestureHandlerRootView style={styles.flex1}>
              <PinchGestureHandler
                onGestureEvent={onPinchEvent}
                onHandlerStateChange={onPinchStateChange}>
                <Animated.View
                  style={[
                    styles.container,
                    {
                      transform: [{scale}, {translateX}, {translateY}],
                    },
                  ]}>
                  <PanGestureHandler
                    onGestureEvent={onPanEvent}
                    onHandlerStateChange={onPanStateChange}>
                    <Animated.View style={styles.innerContainer} ref={ref}>
                      <TextInput
                        numberOfLines={1}
                        style={styles.inputText}
                        onChangeText={onChangeText}
                        ref={currentInputRef}
                      />
                    </Animated.View>
                  </PanGestureHandler>
                </Animated.View>
              </PinchGestureHandler>
            </GestureHandlerRootView>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
});
export default ZoomAndDragView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  innerContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    minWidth: 50,
    borderRadius: 15,
  },
  inputText: {
    minWidth: 50,
    minHeight: 50,
    color: 'white',
    fontSize: 24,
  },
  flex1: {flex: 1},
});
