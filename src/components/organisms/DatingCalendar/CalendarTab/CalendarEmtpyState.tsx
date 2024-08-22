import {VStack} from 'native-base';
import EmptyCalendar from '~/assets/iconset/Dating/EmptyCalendar';
import {Typography, deviceHeight} from '~/components/elemental';
import React, {memo} from 'react';

const CalendarEmtpyState = () => {
  return (
    <VStack alignItems="center" justifyContent="center" flex="1" space="8">
      <EmptyCalendar height={deviceHeight * 0.26} />
      <Typography
        color="gray.400"
        fontWeight="500"
        fontSize="md"
        lineHeight={22}>
        You do not have an dating scheduled yet
      </Typography>
    </VStack>
  );
};
export default memo(CalendarEmtpyState);
