import React, {FC, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  VStack,
  HStack,
  CustomFormDatePicker,
  scale,
  Trash2Icon,
  RepeatScheduleDropDown,
  getColor,
  TrashIconSet,
  Typography,
} from '~/components';
import {useFieldArray} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DayScheduleDropDown from './DayScheduleDropDown';
import {colors} from '~/theme/data';
type PropsType = {
  name: string;
  control: any;
  defaultValue?: any;
  index?: number;
  trigger?: any;
  onDeletePress?: any;
};
const WorkingScheduleItem = ({item, index, control, name, onDeletePress}) => {
  const onDelete = () => {
    onDeletePress?.(index);
  };
  return (
    <VStack
      pb="16px"
      space="16px"
      borderRadius={15}>
      {/* {onDeletePress && (
        <HStack
          alignItems="center"
          space="2px"
          justifyContent={'space-between'}>
          <Typography>Day {index + 1}</Typography>
          <TouchableOpacity onPress={onDelete} activeOpacity={0.1}>
            <TrashIconSet size={24} />
          </TouchableOpacity>
        </HStack>
      )} */}
      <DayScheduleDropDown name={name} index={index} />
      <TimeSlot name={name} control={control} index={index} />
      <RepeatScheduleDropDown name={name} index={index} />
    </VStack>
  );
};
export default WorkingScheduleItem;

const TimeSlot: FC<PropsType> = ({name, control, defaultValue, index}) => {
  const {append, remove, fields} = useFieldArray({
    control,
    name: `${name}[${index}].periods`,
  });
  const renderItem = ({item, index: nestedIndex}) => {
    const onAddTimeSlot = () => {
      append({id: Math.random().toString(16).slice(2)});
    };
    const onDeleteTimeSlot = () => {
      remove(nestedIndex);
    };
    return (
      <SingleTimeSlot
        key={`${index}`}
        {...{
          item,
          index,
          nestedIndex,
          onAddTimeSlot,
          onDeleteTimeSlot,
          len: fields?.length - 1,
          name,
        }}
      />
    );
  };
  return (
    <VStack>{fields?.map((item, index) => renderItem({item, index}))}</VStack>
  );
};
const SingleTimeSlot = ({
  name,
  nestedIndex,
  index,
  onAddTimeSlot,
  onDeleteTimeSlot,
  len,
}) => {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  return (
    <HStack
      justifyContent="space-between"
      alignItems="flex-end"
      space="8px"
      mb={nestedIndex != len ? '4px' : 0}>
      <VStack flex="1">
        <CustomFormDatePicker
          name={`${name}[${index}].periods[${nestedIndex}].startTime`}
          type="time"
          label={nestedIndex != len ? "From" : ""}
          defaultValue={''}
          style={{borderRadius: 10}}
          hasArrow={false}
          my={0}
          onChange={setStartTime}
          maxValue={endTime}
          displayDjsFormat="hh:mm a"
        />
      </VStack>

      <VStack flex="1">
        <CustomFormDatePicker
          name={`${name}[${index}].periods[${nestedIndex}].endTime`}
          type="time"
          label={nestedIndex != len ?"To" : ""}
          defaultValue={''}
          style={{borderRadius: 10}}
          hasArrow={false}
          my={0}
          onChange={setEndTime}
          minValue={startTime}
          displayDjsFormat="hh:mm a"
        />
      </VStack>
      {nestedIndex === len ? (
        <TouchableOpacity onPress={onAddTimeSlot}>
          <VStack
            w={scale(40)}
            h={scale(40)}
            alignSelf="center"
            borderRadius={scale(40) / 2}
            alignItems="center"
            justifyContent="center"
            borderWidth="4px"
            borderColor="primary.500">
            <Ionicons
              name="add-circle"
              size={scale(24)}
              color={getColor({color: 'primary.500'})}
            />
          </VStack>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onDeleteTimeSlot}>
          <VStack
            w={scale(40)}
            h={scale(40)}
            alignSelf="center"
            borderRadius={scale(40) / 2}
            alignItems="center"
            justifyContent="center"
            borderWidth="4px"
            borderColor="error.500">
            <Trash2Icon
              name="add-circle"
              size={scale(24)}
              color={'error.500'}
            />
          </VStack>
        </TouchableOpacity>
      )}
    </HStack>
  );
};
