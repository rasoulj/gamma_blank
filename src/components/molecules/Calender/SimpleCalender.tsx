import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Calendar, CalendarProps, LocaleConfig} from 'react-native-calendars';
import theme, {getTextColor} from '~/theme';
import {Layer, Typography} from '../../elemental';
import {getColor} from '../../elemental/helper';

const getFormattedDate = (date = new Date(), format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul.',
    'Aug',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    'Sunday',
    'Saturday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],

  dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const SimpleCalender = ({
  availableTimes,
  selectDay,
  style,
  label,
  ...props
}: {
  availableTimes?: any;
  style?: StyleProp<ViewStyle>;
  theme?: any;
  label?: string;
  selectDay?: (value) => void;
} & CalendarProps) => {
  const [markedDates, setMarkedDates] = useState({});
  let selectedDates: any = {};

  const getAvailableTime = () => {
    for (let i = 0; i < availableTimes?.length; i++) {
      selectedDates[`${availableTimes[i]}`] = {
        selected: true,
        selectedColor: getColor({color: 'primary.100'}),
        customStyles: {
          container: {
            backgroundColor: getColor({color: 'primary.100'}),
          },
          text: {
            color: theme?.components?.Text?.baseStyle?.()?.color,
          },
        },
      };
    }
  };

  useEffect(() => {
    getAvailableTime();
    setMarkedDates(selectedDates);
  }, []);
  const AddMarkedDates = (date: any) => {
    getAvailableTime();
    selectedDates[`${date}`] = {
      selected: true,
      selectedColor: getColor({color: 'primary.400'}),
    };
    setMarkedDates(selectedDates);
  };

  return (
    <Layer>
      {label && (
        <Typography marginY={15} fontWeight="600">
          Choose date
        </Typography>
      )}
      <Calendar
        markingType={'custom'}
        current={getFormattedDate()}
        firstDay={1}
        enableSwipeMonths={true}
        style={style}
        onDayPress={day => {
          selectDay?.(day.dateString);
          [AddMarkedDates(day.dateString)];
        }}
        markedDates={markedDates}
        theme={{
          calendarBackground: getColor({color: 'background.400'}),
          textSectionTitleColor: getColor({
            color: theme?.components?.Text?.baseStyle?.()?.color,
            theme,
          }),
          dayTextColor: getColor({
            color: theme?.components?.Text?.baseStyle?.()?.color,
            theme,
          }),
          monthTextColor: getTextColor(getColor({color: 'background.500'})),
          todayTextColor: getColor({color: 'secondary.500'}),
          arrowColor: getColor({color: 'primary.400'}),
          ...theme,
        }}
        {...props}
      />
    </Layer>
  );
};

export default SimpleCalender;
