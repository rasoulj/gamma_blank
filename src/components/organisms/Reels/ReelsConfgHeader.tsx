import {HStack} from 'native-base';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {NotificationItem} from '~/components/molecules/HomeHeader';

const ReelsConfigHeader = ({DotIcon}) => {
  return (
    <LinearGradient colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']}>
      <HStack justifyContent="space-between" margin={5}>
        <NotificationItem variant="bold" />
        {DotIcon}
      </HStack>
    </LinearGradient>
  );
};
export default ReelsConfigHeader;
