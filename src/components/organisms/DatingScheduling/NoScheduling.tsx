import {VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Typography} from '~/components/elemental';
import {getColor} from '~/utils/helper/theme.methods';
import {TimeItem} from '../DatingCalendar/ScheduleTab/SelectDateTimeActionSheet';
import Header from './Header';
import dayjs from 'dayjs';

const getTime = date => dayjs(date).format('hh:mm:ss');

const NoScheduling = ({
  onItemSelect,
  user,
}: {
  onItemSelect: (value: any, timeIndex: number) => void;
  user?: any;
}) => {
  const [selectDay, setSelectedDay] = useState(new Date()?.toDateString());
  const [time, setTime] = useState(new Date());

  const onDayPress = day => {
    setSelectedDay(day.dateString);
    onItemSelect?.({date: day.dateString, times: `${getTime(time)}`}, 0);
  };
  const onTimeSelect = (date, index) => {
    setTime(date);
    onItemSelect?.({date: selectDay, times: `${getTime(date)}`}, 0);
  };

  useEffect(() => {
    onItemSelect?.({date: selectDay, times: `${getTime(time)}`}, 0);
  }, []);

  return (
    <ScrollView style={{flexGrow: 1}}>
      <Header user={user} />
      <Calendar
        markedDates={{
          [selectDay]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: getColor({color: 'primary.500'}),
          },
        }}
        theme={{arrowColor: getColor({color: 'primary.500'})}}
        onDayPress={onDayPress}
      />
      <VStack marginTop="16" marginBottom="1">
        <Typography fontSize="md" fontWeight="500" lineHeight={22}>
          Time{' '}
        </Typography>
      </VStack>
      <TimeItem
        singleItem
        setDate={onTimeSelect}
        index={0}
        length={1}
        item={time}
        selectDay={selectDay}
      />
    </ScrollView>
  );
};

export default NoScheduling;
