import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Calendar, CalendarProps} from 'react-native-calendars';
import theme, { getTextColor } from '~/theme';
import {Button, Layer, Typography, Select} from '../../elemental';
import {getColor} from '../../elemental/helper';

const today = dayjs(new Date()).format('YYYY-MM-DD').toString();

const DurationCalender = ({
  unavailableTimes,
  style,
  ...props
}: {
  unavailableTimes: any;
  style?: StyleProp<ViewStyle>;
  theme?: any;
} & CalendarProps) => {
  const [selectedDay, setSelectedDay] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`,
  );
  const [markedDates, setMarkedDates] = useState({});
  const [startDate, setStartDate] = useState('');

  let selectedDates: any = {};

  const getAvailableTime = () => {
    for (let i = 0; i < unavailableTimes?.length; i++) {
      selectedDates[`${unavailableTimes[i]}`] = {
        textColor: '#999',
      };
    }
  };

  useEffect(() => {
    getAvailableTime();
    setMarkedDates(selectedDates);
  }, []);

  const AddMarkedDates = (date: any) => {
    getAvailableTime();
    let selectedDates: any = {};
    if (startDate === '') {
      setStartDate(`${date}`);
      selectedDates[`${date}`] = {
        startingDay: true,
        color: getColor({color: 'primary.400'}),
        selectedColor: getColor({color: 'primary.400'}),
        textColor: "black",
      };
    } else if (new Date(date) > new Date(startDate)) {
      const diffTime = Math.abs(new Date(date) - new Date(startDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      selectedDates[`${startDate}`] = {
        startingDay: true,
        color: getColor({color: 'primary.400'}),
        selectedColor: getColor({color: 'primary.400'}),
        textColor: "black",
      };
      for (let i = 1; i < diffDays; i++) {
        let newDate = new Date(
          new Date(startDate).setDate(new Date(startDate).getDate() + i),
        );
        selectedDates[
          `${newDate.getFullYear()}-${('0' + (newDate.getMonth() + 1)).slice(
            -2,
          )}-${('0' + newDate.getDate()).slice(-2)}`
        ] = {
          color: getColor({color: 'primary.100'}),
          textColor: '#333',
        };
      }

      selectedDates[`${date}`] = {
        color: getColor({color: 'primary.400'}),
        textColor: "black",
        endingDay: true,
      };
    } else if (date === startDate) {
      setStartDate(``);
      selectedDates = {};
    } else {
      setStartDate(`${date}`);
      selectedDates[`${date}`] = {
        startingDay: true,
        color: getColor({color: 'primary.400'}),
        selectedColor: getColor({color: 'primary.400'}),
        textColor: "black",
      };
    }

    setMarkedDates(selectedDates);
  };

  return (
    <>
      <Layer style={{flex: 1, margin: 20, justifyContent: 'center'}}>
        <Typography style={{fontWeight: '600', margin: 15}}>
          Choose date
        </Typography>
        <Calendar
          markingType={'period'}
          // onDayLongPress={onDayPressHandler}
          current={dayjs(new Date()).format('YYYY-MM-DD')}
          firstDay={1}
          enableSwipeMonths={true}
          style={style}
          onDayPress={day => {
            [AddMarkedDates(day.dateString)];
            setSelectedDay(day.dateString);
          }}
          markedDates={markedDates}
          theme={{
            // backgroundColor: '#ddd',
            calendarBackground: getColor({color: 'background.400'}),
            // textSectionTitleColor: color,
            // textSectionTitleDisabledColor: color,
            // selectedDayBackgroundColor: themeColor,
            // todayTextColor: todayColor,
            monthTextColor: getTextColor(getColor({color: 'background.500'})),

            dayTextColor: getColor({
              color: theme?.components?.Text?.baseStyle?.()?.color,
              theme,
            }),
            todayTextColor:getColor({color: 'secondary.500'}),
            // selectedDotColor: themeColor,
            // monthTextColor: getColor({color: 'primary.200'}),
            // textDayFontSize: scale(13),
            arrowColor: getColor({color: 'primary.400'}),
            // textMonthFontSize: scale(textMonthFontSize) || scale(30),
            ...theme,
          }}
          {...props}
        />
        <Typography style={{fontWeight: '600', margin: 15}}>
          Choose start time
        </Typography>
        <Layer
          style={{
            width: '92%',
            height: 50,
            alignSelf: 'center',
          }}>
          <Select
            style={{height: 50}}
            options={[
              {label: '12 am', value: '12'},
              {label: '1 pm', value: '13'},
              {label: '2 pm', value: '14'},
            ]}
          />
        </Layer>
      </Layer>
      <Button
        style={{width: '80%', height: 50, alignSelf: 'center', marginBottom:10}}
        isLoading={false}
        onPress={() => {}}>
        Next
      </Button>
    </>
  );
};

export default DurationCalender;
