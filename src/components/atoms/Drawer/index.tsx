import React, {useEffect} from 'react';
import {ScrollView, View, Text, Overlay} from 'native-base';
import {wp} from '~/utils/responsive';
import useDrawer from '../../elemental/hooks/useDrawer';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  set,
} from 'react-native-reanimated';
import {ViewStyle} from 'react-native';
interface IProps {
  children: React.ReactNode;
  drawerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  direction?: 'left' | 'right';
  swipeEnabled?: boolean;
}

export default function Drawer({
  children,
  drawerStyle,
  contentContainerStyle,
  direction = 'left',
  swipeEnabled = true,
}: IProps) {
  const {open, toggleDrawer, setDirection, setSwipeEnabled} = useDrawer();

  const translateX = useSharedValue(direction === 'left' ? wp(-100) : wp(100));

  const childrenIds = React.useRef<any>(null);

  const style = useAnimatedStyle(() => {
    return {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10,
      transform: [
        {
          translateX: withTiming(translateX.value),
        },
      ],
    };
  });

  useEffect(() => {
    setDirection?.(direction);
    setSwipeEnabled?.(swipeEnabled);
  }, [direction]);

  useEffect(() => {
    open
      ? (translateX.value = 0)
      : (translateX.value = direction === 'left' ? wp(-100) : wp(100));
  }, [open]);

  return (
    <Animated.View
      onStartShouldSetResponder={(evt: any) => {
        evt.persist();
        if (childrenIds?.current) {
          if (childrenIds?.current === evt?.target?._nativeTag) {
            return false;
          }
          toggleDrawer();
        }
      }}
      style={[
        {
          width: wp(100),
          ...style,
        },
        {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        drawerStyle,
      ]}>
      <ScrollView
        nativeID="drawer"
        bounces={false}
        ref={(component: any) => {
          childrenIds.current = component?._nativeTag;
        }}
        style={[
          contentContainerStyle,
          {
            alignSelf: direction === 'right' ? 'flex-end' : 'flex-start',
          },
        ]}>
        {children}
      </ScrollView>
    </Animated.View>
  );
}
