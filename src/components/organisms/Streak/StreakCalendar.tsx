import React, {memo, useEffect, useState} from 'react';
import {StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {
  Calendar,
  CalendarProps,
  LocaleConfig,
  DayComponentProps,
} from 'react-native-calendars';
import theme from '~/theme';
import {Layer, View, Text, getColor, TickIconSet} from '../../elemental';
import {appFormatDate} from '~/utils/helper';

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

  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const selectedDates: any = [
  '2023-12-13',
  '2023-12-20',
  '2023-12-16',
  '2023-12-18',
];

const StreakCalendar = ({
  availableTimes = selectedDates,
  selectDay,
  style,
  ...props
}: {
  availableTimes?: any;
  style?: StyleProp<ViewStyle>;
  theme?: any;
  selectDay?: (value) => void;
} & CalendarProps) => {
  const [markedDates, setMarkedDates] = useState({});

  const getAvailableTime = () => {
    for (let i = 0; i < availableTimes.length; i++) {
      availableTimes[`${availableTimes[i]}`] = {
        selected: true,
        selectedColor: getColor({color: 'primary.100'}),
        customStyles: {
          container: {
            backgroundColor: getColor({color: 'rate.100'}),
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
    setMarkedDates(availableTimes);
  }, [availableTimes]);

  const CustomDayComponent = (props: DayComponentProps) => {
    const {date, marking} = props;

    // Get today's date
    const today = appFormatDate();

    // Convert date to Date object
    const currentDate = appFormatDate(date.dateString).toString();

    // Check if the date is after today
    const isAfterToday = currentDate > today;
    const isBeforeToday = currentDate < today;

    // Custom styles for days after today
    const customAfterStyle = isAfterToday
      ? {backgroundColor: getColor({color: 'primary.200'})}
      : {};
    const customBeforStyle = isBeforeToday
      ? {backgroundColor: getColor({color: 'gray.300'})}
      : {};

    const customTodayStyle =
      today === date.dateString
        ? {
            backgroundColor: getColor({color: 'primary.200'}),
            borderWidth: 2,
            borderColor: getColor({color: 'primary.500'}),
          }
        : {};

    return (
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            width: 32,
            height: 32,
          },
          customAfterStyle,
          customBeforStyle,
          customTodayStyle,
          marking && {
            backgroundColor: getColor({color: 'rate.100'}),
          },
        ]}>
        {marking ? (
          <TickIconSet width={24} height={24} />
        ) : (
          <Text
            fontWeight={'400'}
            fontSize={12}
            lineHeight={17}
            color={getColor({
              color:
                isAfterToday || today === date.dateString
                  ? 'primary.500'
                  : 'grey.400',
            })}>
            {date.day}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Layer style={styles.mt}>
      <Calendar
        markingType={'custom'}
        current={appFormatDate(new Date())}
        firstDay={1}
        enableSwipeMonths={false}
        style={style}
        markedDates={markedDates}
        hideExtraDays={true}
        dayComponent={CustomDayComponent}
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
          textMonthFontWeight: '500',
          textMonthFontSize: 16,
          monthTextColor: getColor({color: 'gray.800'}),
          textDayHeaderFontWeight: '500',
          arrowColor: getColor({color: 'gray.800'}),
          textDayHeaderFontSize: 18,
          ...theme,
        }}
        {...props}
      />
    </Layer>
  );
};

export default memo(StreakCalendar);

const styles = StyleSheet.create({
  mt: {marginTop: 20},
});
