import React from 'react';
import useHeader from '~/components/elemental/hooks/use_header';
import CalendarTab from './CalendarTab/CalendarTab';
import ScheduleTab from './ScheduleTab/ScheduleTab';
import {Tabs, useNavigate} from '~/components';
import {VStack} from 'native-base';

const DatingCalendar = () => {
  const {} = useHeader({
    title: {children: 'Calendar', fontWeight: 'bold'},
    hasBack: false,
  });
  const {navigateWithName} = useNavigate();

  const tabs = [
    {
      id: 'Calendar',
      label: 'Calendar',
      component: <CalendarTab navigateWithName={navigateWithName} />,
    },
    {
      id: 'Schedule',
      label: 'Schedule',
      component: <ScheduleTab />,
    },
  ];
  return (
    <VStack flex="1">
      <Tabs tabs={tabs} activeTab={'Calendar'} />
    </VStack>
  );
};
export default DatingCalendar;
