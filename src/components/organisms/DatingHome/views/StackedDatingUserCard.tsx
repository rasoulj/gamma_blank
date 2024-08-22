import {Pressable, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {DatingUserCard} from './DatingUserCard';
import {useDatingHome} from '../hooks/DatingHome.hook';
import {deviceHeight, deviceWidth} from '~/utils/methods';
import {HStack, ScrollView, VStack, View, ZStack} from 'native-base';
import {Box, LoadIndicator, Typography} from '~/components/elemental';
import {useRef, useState} from 'react';
import {DatingUserMoreInfo} from './DatingUserMoreInfo';
import {DatingFilter} from './DatingFilter';
import {
  FingerLeftIcon,
  FingerRightIcon,
  FingerUpIcon,
} from '~/assets/icons/dating';
import {RequestLocation} from './RequestLocation';
import datingHomeStore from '~/stores/datingHomeStore';
const END_POSITION = 300;

const height = deviceHeight - 220;
const width = deviceWidth - 60;

function IntroText({title, subTitle, icon}) {
  return (
    <VStack alignItems="center" height={20}>
      {icon}
      <Typography
        lineHeight="xl"
        color="gray.800"
        fontWeight={700}
        fontSize="sm">
        {title}
      </Typography>
      <Typography
        textAlign="center"
        lineHeight="md"
        color="gray.800"
        fontWeight={400}
        fontSize="xs">
        {subTitle}
      </Typography>
    </VStack>
  );
}

export function StackedDatingUserCard({
  filterDisclose,
}: {
  filterDisclose: any;
}): JSX.Element {
  const {
    activeUser,
    nextUser,
    moveNext,
    locationDisclose,
    saveLocation,
    filterHook,
    applyFilter,
    isLoading,
    doLike,
    doDislike,
  } = useDatingHome();

  const scrollViewRef = useRef(null);

  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);
  const onVertical = useSharedValue(0);

  const {intro, setIntro} = datingHomeStore(state => state);

  const doScroll = () => {
    if (!onVertical.value) return;
    scrollViewRef.current?.scrollTo({
      y: onVertical.value < 0 ? deviceHeight - 220 : 0,
      animated: true,
    });
  };

  const _doLike = () => {
    doLike(undefined);
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };

  const _doDislike = () => {
    doDislike(undefined);
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };

  const resetLoc = () => (position.value = 0);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.absoluteY > e.absoluteX) {
        onVertical.value = e.translationY > 0 ? 1 : -1;
      } else onVertical.value = 0;

      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd(e => {
      if (position.value > END_POSITION / 2) {
        runOnJS(doLike)(undefined);
        runOnJS(resetLoc)();
      } else if (position.value < -END_POSITION / 2) {
        runOnJS(doDislike)(undefined);
        runOnJS(resetLoc)();
      } else {
        position.value = withTiming(0, {duration: 400});

        if (onVertical.value) {
          runOnJS(doScroll)();
        }
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
        {isLoading && <LoadIndicator style={styles.isLoading} />}
        <View style={styles.backBox}>
          <DatingUserCard user={nextUser} like={null} disLike={null} />
        </View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <DatingUserCard
              user={activeUser}
              like={likeStyle}
              disLike={disLikeStyle}
            />
          </Animated.View>
        </GestureDetector>

        {intro > 0 && (
          <Pressable
            style={styles.frontBox}
            onPress={() => setIntro(intro - 1)}>
            {intro == 2 && (
              <HStack
                h="100%"
                justifyContent="space-evenly"
                alignItems="flex-end"
                pb={4}>
                <Box w={1} />
                <Box w="40%">
                  <IntroText
                    icon={<FingerLeftIcon />}
                    title="Not for you?"
                    subTitle="Swipe left if not"
                  />
                </Box>
                <Box w={0.5} h={20} backgroundColor="gray.400" />

                <Box w="40%">
                  <IntroText
                    icon={<FingerRightIcon />}
                    title="Like what you see?"
                    subTitle="swipe right for a chance for match"
                  />
                </Box>

                <Box w={1} />
              </HStack>
            )}

            {intro == 1 && (
              <HStack
                h="100%"
                justifyContent="space-evenly"
                alignItems="flex-end"
                pb={4}>
                <IntroText
                  icon={<FingerUpIcon />}
                  title="Want to know more?"
                  subTitle="swipe up to explore someone’s profile"
                />
              </HStack>
            )}
          </Pressable>
        )}

        <RequestLocation
          disclose={locationDisclose}
          saveLocation={saveLocation}
        />

        <DatingFilter
          filterHook={filterHook}
          disclose={filterDisclose}
          onApply={applyFilter}
        />
      </ZStack>

      <DatingUserMoreInfo
        onLike={_doLike}
        onDislike={_doDislike}
        user={activeUser}
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
