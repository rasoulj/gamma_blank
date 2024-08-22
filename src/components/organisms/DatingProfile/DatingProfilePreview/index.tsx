import React, {useRef} from 'react';
import {Box, ScrollView, ZStack, deviceHeight, deviceWidth} from '~/components';
import {DatingUserCard} from '../../DatingHome/views/DatingUserCard';
import {useDatingSetup} from '../../DatingSetup/hooks/dating.hook';
import {getDatingUserFromAnswersMap} from '../../DatingHome/hooks/DatingHome.hook';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {DatingUserMoreInfo} from '../../DatingHome/views/DatingUserMoreInfo';
import {StyleSheet} from 'react-native';
import useHeader from '~/components/elemental/hooks/use_header';
import useAuthStore from '~/stores/authStore';

const height = deviceHeight - 220;
const width = deviceWidth - 60;

export function DatingProfilePreview() {
  useHeader({
    title: {
      children: 'Profile Preview',
      fontSize: 'lg',
      fontWeight: 'bold',
    },
    hasBack: true,
  });

  return (
    <Box flex={1} mx={8}>
      <GestureHandlerRootView>
        <InnerProfilePreview />
      </GestureHandlerRootView>
    </Box>
  );
}

export function InnerProfilePreview() {
  const {answersMap} = useDatingSetup();

  const auth = useAuthStore();

  const datingUser = getDatingUserFromAnswersMap(answersMap, auth);
  const scrollViewRef = useRef(null);

  const position = useSharedValue(0);
  const onVertical = useSharedValue(0);

  const doScroll = () => {
    if (!onVertical.value) return;
    scrollViewRef.current?.scrollTo({
      y: onVertical.value < 0 ? deviceHeight - 220 : 0,
      animated: true,
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.absoluteY > e.absoluteX) {
        onVertical.value = e.translationY > 0 ? 1 : -1;
      } else onVertical.value = 0;
    })
    .onEnd(e => {
      position.value = withTiming(0, {duration: 400});

      if (onVertical.value) {
        runOnJS(doScroll)();
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: deviceHeight - 320},
        {rotate: `${position.value / 6}deg`},
        {translateY: -deviceHeight + 320},
      ],
    };
  });

  const likeStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      opacity: position.value / 10,
    };
  });

  const disLikeStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      opacity: -position.value / 10,
    };
  });

  return (
    <ScrollView ref={scrollViewRef}>
      <ZStack>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <DatingUserCard
              user={datingUser}
              like={likeStyle}
              disLike={disLikeStyle}
            />
          </Animated.View>
        </GestureDetector>
      </ZStack>

      <DatingUserMoreInfo
        noLike
        onLike={() => {}}
        onDislike={() => {}}
        user={datingUser}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    height,
    width,
    backgroundColor: 'rgba(255,0,0,0.2)',
    borderRadius: 20,
    marginBottom: 30,
    zIndex: 100,
  },

  backBox: {
    flex: 1,
    height,
    width,
  },

  frontBox: {
    height,
    width,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    marginBottom: 30,
    zIndex: 1000,
  },

  isLoading: {
    zIndex: 1001,
  },
});
