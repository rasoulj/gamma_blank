import {VStack} from 'native-base';
import EmptyCalendar from '~/assets/iconset/Dating/EmptyCalendar';
import {Typography, deviceHeight} from '~/components/elemental';
import React, {memo} from 'react';

const ScheduleEmtpyState = () => {
  return (
    <VStack alignItems="center" justifyContent="center" flex="1" space="8">
      <EmptyCalendar height={deviceHeight * 0.26} />
      <Typography
        color="gray.400"
        fontWeight="500"
        fontSize="md"
        textAlign="center"
        lineHeight={22}>
        In order to schedule an dating with you, people need to be able to see
        your free times. Enter your free times from the button below.
      </Typography>
    </VStack>
  );
};
export default memo(ScheduleEmtpyState);
