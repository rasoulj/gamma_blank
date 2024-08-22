import React, {useEffect, useState} from 'react';
import {VStack, Spacer, Center, MicrophoneIconSet, getColor, View} from '../../elemental';
import Typography from '../../atoms/Typography';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {getTextColor} from '~/theme';
import {Pressable, StyleSheet} from 'react-native';

function Microphone({isRecording = false}: {isRecording: boolean}) {
  const numRings = 3;
  const scales = Array.from({length: numRings}, () => useSharedValue(0));
  const opacities = Array.from({length: numRings}, (_, index) =>
    useSharedValue(0.4 - index * 0.2),
  );

  const animationConfig = {
    duration: 1500,
    easing: Easing.linear,
  };

  useEffect(() => {
    if (isRecording) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [isRecording]);

  const startAnimation = () => {
    scales.forEach((scale, index) => {
      scale.value = withRepeat(
        withSequence(
          withTiming(index * 0.5, animationConfig),
          withTiming(0, animationConfig),
        ),
        -1,
      );
      opacities[index].value = withRepeat(
        withSequence(
          withTiming(0.8 - index * 0.1, animationConfig),
          withTiming(0, animationConfig),
        ),
        -1,
      );
    });
  };

  const stopAnimation = () => {
    scales.forEach(scale => {
      scale.value = withTiming(0);
    });

    opacities.forEach(opacity => {
      opacity.value = withTiming(0);
    });
  };

  const ringStyles = scales.map((scale, index) => {
    const opacity = opacities[index];
    return useAnimatedStyle(() => {
      const scaleVal = 1 + scale.value * 0.5;
      const animatedOpacity = interpolate(
        opacity.value,
        [0, 1],
        [1 - index * 0.2, 0],
      );
      return {
        transform: [{scale: scaleVal}],
        opacity: animatedOpacity,
      };
    });
  });

  return (
    <Center
      backgroundColor={'primary.500'}
      style={{
        width: 100,
        height: 100,
        zIndex: 10,
      }}
      borderRadius={100}>
      {ringStyles.map((ringStyle, index) => (
        <Animated.View
          key={index}
          style={[
            {
              width: 100,
              height: 100,

              ...StyleSheet.absoluteFillObject,
              backgroundColor: getColor({color: 'primary.500'}),
              borderRadius: 100,
            },
            ringStyle,
          ]}
        />
      ))}
      <MicrophoneIconSet
        width={55}
        height={55}
        color={getTextColor(getColor({color: 'primary.500'}))}
      />
    </Center>
  );
}

export default Microphone;
