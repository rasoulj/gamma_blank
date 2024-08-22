import {Box, Circle, HStack, VStack} from 'native-base';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  CustomActionSheet,
  FlatList,
  MinusIconSet,
  PlusIcon,
  Typography,
  deviceHeight,
} from '~/components';
import DatePicker from 'react-native-date-picker';
import {StyleSheet, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import {useCreateAvailableTimeMutation} from '../hooks';
import {useQueryClient} from 'react-query';
import {Calendar} from 'react-native-calendars';
import {getColor} from '~/utils/helper/theme.methods';
import {getTimeByDayjs} from '../helper';
import {appFormatDate} from '~/utils/helper';

const SelectDateTimeActionSheet = ({
  isVisible,
  onClose,
  item,
}: {
  isVisible: boolean;
  onClose: () => void;
  item?: any;
}) => {
  const [selectDay, setSelectedDay] = useState(new Date()?.toDateString());
  const [timeArray, setTimeArray] = useState([new Date()]);

  const flatlistRef = useRef<FlatList>();

  useEffect(() => {
    if (item) {
      setSelectedDay(appFormatDate(item?.date, 'YYYY-MM-DD'));
      let currentTimes = item?.times ? item?.times?.split(',') : [];
      let timesArray = [];
      for (let i = 0; i < currentTimes?.length; i++) {
        const time = currentTimes[i];
        let timeSlots = time?.split(':');
        const currentDate = new Date();
        currentDate.setHours(parseInt(timeSlots?.[0]));
        currentDate.setMinutes(parseInt(timeSlots?.[1]));
        currentDate.setSeconds(0);
        timesArray.push(currentDate);
      }
      setTimeArray(timesArray);
    }
  }, [item]);

  const onAddPress = () => {
    let timeArrayTemp = [...timeArray];
    timeArrayTemp.push(
      dayjs(timeArray[timeArray.length - 1])
        .add(60, 'minute')
        .toDate(),
    );
    setTimeArray(timeArrayTemp);
    setTimeout(() => {
      flatlistRef.current?.scrollToEnd({animated: true});
    }, 500);
  };

  const onMinusPress = (index: number) => {
    let timeArrayTemp = [...timeArray];
    timeArrayTemp.splice(index, 1);
    setTimeArray(timeArrayTemp);
  };
  const setDate = (date: Date, index: number) => {
    let timeArrayTemp = [...timeArray];
    timeArrayTemp[index] = date;
    setTimeArray(timeArrayTemp);
  };

  const renderItem = ({item, index}) => {
    return (
      <TimeItem
        {...{
          item,
          index,
          onAddPress,
          onMinusPress,
          setDate,
          length: timeArray.length,
          selectDay,
        }}
        key={`${index}`}
      />
    );
  };

  const ListHeaderComponent = useCallback(() => {
    const onDayPress = day => {
      setSelectedDay(day.dateString);
    };

    return (
      <>
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
          minDate={new Date().toString()}
          initialDate={
            item ? appFormatDate(item?.date, 'YYYY-MM-DD') : undefined
          }
        />
        <VStack marginTop="16" marginBottom="1">
          <Typography fontSize="md" fontWeight="500" lineHeight={22}>
            Time{' '}
          </Typography>
        </VStack>
      </>
    );
  }, [selectDay]);

  const {mutate, isLoading} = useCreateAvailableTimeMutation();
  const queryClient = useQueryClient();
  const onDonePress = () => {
    const times = timeArray.map(time => {
      const timeSpans = time.toTimeString()?.split(':');
      return `PT${timeSpans[0]}H${timeSpans[1]}M`;
    });

    mutate(
      {date: selectDay, times},
      {
        onSuccess: (data, variables, context) => {
          if (data?.match_createAvailableTime?.status?.code === 1) {
            queryClient.invalidateQueries(['match_getAvailableTimes'], {
              exact: false,
            });
            onClose();
          }
        },
      },
    );
  };

  return (
    <CustomActionSheet isVisible={isVisible} onClose={onClose}>
      <VStack maxH={deviceHeight * 0.8}>
        <FlatList
          data={timeArray}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={<Box h="16" />}
          showsVerticalScrollIndicator={false}
          ref={flatlistRef}
        />
        <Button onPress={onDonePress} isLoading={isLoading}>
          Done
        </Button>
      </VStack>
    </CustomActionSheet>
  );
};
export default SelectDateTimeActionSheet;

export const TimeItem = ({
  item,
  index,
  onAddPress,
  onMinusPress,
  length,
  setDate,
  singleItem = false,
  selectDay,
}: {
  item: any;
  index: number;
  onAddPress?: () => void;
  onMinusPress?: (index: number) => void;
  length?: number;
  setDate?: (date, index) => void;
  singleItem?: boolean;
  selectDay?: string;
}) => {
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);

  const onTimePress = () => setVisibleTimePicker(true);

  const onCloseTimePicker = (date?: any) => {
    setVisibleTimePicker(false);
    if (date) setDate(date, index);
  };
  const onPressIcon = () => {
    if (index === length - 1) onAddPress();
    else onMinusPress(index);
  };

  const isCurrentDate = useMemo(() => {
    return (
      appFormatDate(new Date(selectDay), 'YYYY-MM-DD') ===
      appFormatDate(new Date(), 'YYYY-MM-DD')
    );
  }, [selectDay]);

  return (
    <>
      <HStack justifyContent="space-between" space="2" mb="2">
        <VStack
          borderColor="gray.400"
          borderWidth="1"
          flex="1"
          paddingLeft="4"
          borderRadius="10"
          justifyContent="center">
          <TouchableOpacity onPress={onTimePress} style={styles.touchable}>
            <Typography color="gray.400">{getTimeByDayjs(item)}</Typography>
          </TouchableOpacity>
        </VStack>
        {!singleItem && (
          <TouchableOpacity onPress={onPressIcon}>
            <Circle
              w="50"
              h="50"
              borderWidth="2"
              borderColor={index === length - 1 ? 'primary.500' : 'error.500'}>
              {index === length - 1 ? (
                <PlusIcon color="primary.500" />
              ) : (
                <MinusIconSet color="error.500" strokeWidth={'2'} />
              )}
            </Circle>
          </TouchableOpacity>
        )}
      </HStack>
      <DatePicker
        modal
        mode="time"
        date={item}
        open={visibleTimePicker}
        onConfirm={onCloseTimePicker}
        onCancel={onCloseTimePicker}
        minimumDate={isCurrentDate ? new Date() : undefined}
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {marginBottom: 64},

  touchable: {minHeight: 50, justifyContent: 'center'},
});
