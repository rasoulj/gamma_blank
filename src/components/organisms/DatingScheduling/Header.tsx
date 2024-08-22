import {VStack} from 'native-base';
import React, {memo} from 'react';
import {Typography} from '~/components/elemental';

const Header = ({user}) => {
  return (
    <VStack space="2" marginBottom="8">
      <Typography color="gray.800" fontWeight="600" fontSize="2xl">
        Schedule a Date{' '}
      </Typography>
      <Typography color="gray.500" fontWeight="400" fontSize="sm">
        Here you can view and select the times when{' '}
        <Typography color="gray.800" fontWeight="700">
          {user?.fullName ?? ''}
        </Typography>{' '}
        is available. To reserve your preferred time, simply click on the
        desired empty slot. Please choose a time when both of you can be present
        for the meeting.{' '}
      </Typography>
    </VStack>
  );
};

export default memo(Header);
