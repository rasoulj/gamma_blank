import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {
  FlashStarIconSet,
  HStack,
  Typography,
  VStack,
  getColor,
} from '~/components';
import useHeader from '~/components/elemental/hooks/use_header';
import StreakCalendar from './StreakCalendar';
import {useGetStreak, useGetStreaks} from '../CourseList/hook';
import {appFormatDate} from '~/utils/helper';

const Streak = () => {
  const {} = useHeader({
    title: {children: 'Streak', fontWeight: 'bold', fontSize: 'lg'},
  });

  const {data} = useGetStreak();
  const {data: streaksData} = useGetStreaks();

  const startDateArray = streaksData?.pages.map(item =>
    appFormatDate(item.startDate),
  );
  const getDescription = () => {
    if (data?.streak_getStreak?.result?.current?.dayCount == 0) {
      return 'Time to restart your streak!';
    } else if (data?.streak_getStreak?.result?.current?.dayCount < 4) {
      return 'Welcome back!';
    } else if (data?.streak_getStreak?.result?.current?.dayCount < 7) {
      return 'Impressive Streak! Keep it up!';
    } else if (data?.streak_getStreak?.result?.current?.dayCount < 10) {
      return 'The streak badge is within reach!';
    } else if (data?.streak_getStreak?.result?.current?.dayCount <= 10) {
      return 'Your streak is blazing! Keep it up!';
    } else {
      return '';
    }
  };

  const getTitle = () => {
    if (data?.streak_getStreak?.result?.current?.dayCount == 0) {
      return 'Revive your streak!';
    } else if (data?.streak_getStreak?.result?.current?.dayCount < 4) {
      return 'Comeback Challenger!';
    } else if (data?.streak_getStreak?.result?.current?.dayCount < 7) {
      return 'Great Work!';
    } else if (data?.streak_getStreak?.result?.current?.dayCount < 10) {
      return 'Streak Badge Beckons';
    } else if (data?.streak_getStreak?.result?.current?.dayCount <= 10) {
      return 'On Fire!';
    } else {
      return '';
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        borderWidth={1}
        p={'4'}
        borderRadius={10}
        borderColor={getColor({color: 'rate.100'})}>
        <VStack>
          <Typography fontSize="sm" lineHeight={19} fontWeight={'700'}>
            {getTitle()}
          </Typography>
          <Typography fontSize="xs" lineHeight={17} fontWeight={'500'} mt="2">
            {getDescription()}
          </Typography>
        </VStack>
        <VStack>
          <FlashStarIconSet
            width={55}
            height={55}
            color={getColor({color: 'rate.100'})}
            fill={getColor({color: 'rate.100'})}
          />
          <Typography
            fontSize={'md'}
            fontWeight={'500'}
            lineHeight={22}
            color={'gray.800'}
            style={styles.best}>
            {data?.streak_getStreak?.result?.current?.dayCount}
          </Typography>
        </VStack>
      </HStack>
      <Typography
        fontSize={'sm'}
        fontWeight={'500'}
        lineHeight={19}
        color={'gray.800'}
        mt={'6'}
        mb={'4'}
        mx={'1'}>
        Learn courses continuously to keep the streak.
      </Typography>
      <HStack justifyContent={'space-between'} mx="1">
        <VStack
          shadow={'4'}
          w="48%"
          borderRadius={15}
          alignItems={'center'}
          px={'12'}
          py={'6'}
          bg={getColor({color: 'background.500'})}>
          <Typography mb={17} fontSize="md" lineHeight={22} fontWeight={'700'}>
            Current
          </Typography>
          <VStack>
            <FlashStarIconSet
              width={60}
              height={60}
              color={getColor({color: 'gray.400'})}
              fill={getColor({color: 'gray.400'})}
            />
            <Typography
              fontSize={'lg'}
              fontWeight={'500'}
              lineHeight={24}
              color={getColor({color: 'gray.50'})}
              style={styles.current}>
              {data?.streak_getStreak?.result?.current?.dayCount}
            </Typography>
          </VStack>
        </VStack>
        <VStack
          w="48%"
          shadow={'4'}
          borderRadius={15}
          alignItems={'center'}
          px={'12'}
          py={'6'}
          bg={getColor({color: 'background.500'})}>
          <Typography mb={17} fontSize="md" lineHeight={22} fontWeight={'700'}>
            Best
          </Typography>
          <VStack>
            <FlashStarIconSet
              width={60}
              height={60}
              color={getColor({color: 'rate.100'})}
              fill={getColor({color: 'rate.100'})}
            />
            <Typography
              fontSize={'md'}
              fontWeight={'500'}
              lineHeight={22}
              color={'gray.800'}
              style={styles.best}>
              {data?.streak_getStreak?.result?.best?.dayCount}
            </Typography>
          </VStack>
        </VStack>
      </HStack>
      <StreakCalendar availableTimes={startDateArray} />
    </ScrollView>
  );
};

export default Streak;

const styles = StyleSheet.create({
  current: {
    position: 'absolute',
    top: '30%',
    left: '40%',
  },

  best: {
    position: 'absolute',
    alignSelf: 'center',
    top: '30%',
  },
});
