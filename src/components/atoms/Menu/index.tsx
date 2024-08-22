import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import {getColor} from '~/utils/helper/theme.methods';
import {deviceWidth} from '~/utils/methods';

interface MenuProps extends ViewProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const Menu = ({children, isVisible, onClose, ...props}: MenuProps) => {
  const menuSlide = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    Animated.parallel([
      Animated.timing(menuSlide, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 900,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (isVisible) {
      slideIn();
    }
  }, [isVisible]);

  const slideOut = () => {
    Animated.parallel([
      Animated.timing(menuSlide, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => onClose());
  };

  const translateX = menuSlide.interpolate({
    inputRange: [0, 1],
    outputRange: [350, 0],
  });

  return (
    <Animated.View
      style={{
        display: isVisible ? 'flex' : 'none',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        right: -20,
        width: deviceWidth,
        height: '100%',
        zIndex: 2,
        transform: [{translateX}],
      }}
      {...props}>
      <TouchableWithoutFeedback onPress={() => slideOut()}>
        <Animated.View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: getColor({color: 'gray.800'}),
            opacity,
          }}
        />
      </TouchableWithoutFeedback>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default Menu;
