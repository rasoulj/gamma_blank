import React, {useRef} from 'react';
import {StyleSheet, Text, TextInput, View, Animated as Am} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import {getColor} from '~/utils/helper/theme.methods';

const SIZE = 90;
const CIRCLE_RADIUS = SIZE * 2;

type ContextType = {
  translateX: number;
  translateY: number;
};

function ZoomAndDragView2() {
  const translateX = useSharedValue(1);
  const translateY = useSharedValue(1);
  const scale = useSharedValue(1);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
    },
  });

  const pinchGestureEvent = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {},
    onActive: (event, context) => {
      scale.value = event.scale;
    },
    onEnd: () => {},
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const pinchStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[rStyle]}>
            <PinchGestureHandler onGestureEvent={pinchGestureEvent}>
              <Animated.View style={[styles.square, pinchStyle]}>
                <TextInput numberOfLines={1} style={styles.inputText} />
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

export default ZoomAndDragView2;

const styles = StyleSheet.create({
  inputText: {
    minWidth: 50,
    minHeight: 50,
    color: 'white',
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: getColor({color: 'gray.500'}),
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    ...StyleSheet.absoluteFillObject,
  },
  square: {
    minWidth: SIZE,
    minHeight: SIZE,
    backgroundColor: getColor({color: 'gray.500'}),
    borderRadius: 20,
    padding: 70,
    opacity: 0.5,
  },
});
