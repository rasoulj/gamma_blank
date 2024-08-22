import {VStack} from 'native-base';
import React, {useCallback, useState} from 'react';
import {Typography, Button} from '~/components/elemental';
import SelectDateTimeActionSheet from './SelectDateTimeActionSheet';
import useAuthStore from '~/stores/authStore';
import ScheduleList from './ScheduleList';

const ScheduleTab = () => {
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const user = useAuthStore(state => state.user);

  const Header = useCallback(() => {
    return (
      <VStack my="8">
        <Typography fontWeight="600" fontSize="2xl" color="gray.800">
          Schedule a date !
        </Typography>
        <Typography fontSize="sm" fontWeight="400" color="#979491">
          Enter your free times
        </Typography>
      </VStack>
    );
  }, []);

  const onAddPress = () => setVisibleCalendar(true);

  return (
    <>
      <VStack flex="1" pb="4">
        <ScheduleList Header={Header} userId={user?.id} hasItemMenu />
        <Button onPress={onAddPress}>Add New Time</Button>
      </VStack>
      {visibleCalendar && (
        <SelectDateTimeActionSheet
          isVisible={visibleCalendar}
          onClose={() => setVisibleCalendar(false)}
        />
      )}
    </>
  );
};
export default ScheduleTab;
