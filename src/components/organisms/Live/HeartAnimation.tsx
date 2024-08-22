import React, {useRef, useEffect, forwardRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {MultiBigLike, MultiLike} from '~/assets';
import {deviceHeight} from '~/utils/methods';

const height = deviceHeight * 0.15;
const animationDuration = 1500;

const HeartAnimation = forwardRef(
  ({isMultiLike = false}: {isMultiLike?: boolean}, ref) => {
    const translateY = useRef(new Animated.Value(200)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(1.2)).current;

    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: false,
        }),
        Animated.timing(scale, {
          toValue: 0.8,
          duration: animationDuration,
          useNativeDriver: false,
        }),
      ]).start();
    };

    useEffect(() => {
      startAnimation();
    }, []);

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{translateY}, {scale}],
              opacity,
            },
          ]}>
          {isMultiLike ? <MultiBigLike /> : <MultiLike />}
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1000,
    position: 'absolute',
    right: 0,
    bottom: 80,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeartAnimation;
