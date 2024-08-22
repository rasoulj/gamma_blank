import React, {FC, useRef, useState} from 'react';
import {
  Header,
  VStack,
  Button,
  FlatList,
  WorkingScheduleItem,
  getColor,
} from '~/components/elemental';
import {useFieldArray} from 'react-hook-form';
import {DayOfWeek, WorkingScheduleRepeatType} from './enums';
import {TouchableOpacity} from 'react-native';
import SelectedItemHeader from './SelectedItemHeader';
type PropsType = {
  name: string;
  control: any;
  defaultValue?: any;
  index?: number;
  trigger?: any;
  type?: 'add' | 'edit';
};
const WorkingScheduleItems: FC<PropsType> = ({
  name,
  control,
  defaultValue,
  type = 'add',
}) => {
  const [select, setSelect] = useState(null);
  const {append, fields, remove} = useFieldArray({control, name});
  const flatListRef = useRef();
  const onAddPress = () => {
    append({
      periods: [{startTime: '', endTime: ''}],
      dayOfWeek: DayOfWeek.Monday,
      repeatType: WorkingScheduleRepeatType.Weekly,
      repeatEveryType: undefined,
      repeatEveryValue: undefined,
      endsOn: undefined,
      startsOn: undefined,
    });
    setTimeout(() => flatListRef?.current?.scrollToEnd(), 200);
  };
  const onDeletePress = (index: number) => {
    remove(index);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: getColor({
            color: item?.id === select?.id ? 'primary.500' : 'background.500',
          }),
          borderRadius: 25,
          marginHorizontal: 4,
          marginVertical: 8,
          padding: 16,
          backgroundColor: getColor({color: 'background.500'}),
          shadowColor: getColor({color: 'gray.800'}),
          shadowOpacity: 0.2,
          shadowRadius: 9,
          shadowOffset: {width: 0, height: 0},
        }}
        onLongPress={() => setSelect({...item, index})}>
        <WorkingScheduleItem
          {...{
            index,
            item,
            control,
            fields,
            name,
            onDeletePress: type === 'add' ? onDeletePress : undefined,
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <VStack flex="1">
      {select ? (
        <SelectedItemHeader
          onClose={() => setSelect(null)}
          removeItem={() => onDeletePress(select?.index)}
        />
      ) : (
        <Header
          title={type === 'edit' ? 'Edit Schedule' : 'Working Schedule'}
          style={{marginHorizontal: 0}}
        />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        data={fields}
        renderItem={renderItem}
        nestedScrollEnabled
        style={{flex: 1}}
      />
      {type === 'add' && (
        <Button variant={'outline'} style={{height: 49}} onPress={onAddPress}>
          Add another day
        </Button>
      )}
    </VStack>
  );
};
export default WorkingScheduleItems;
