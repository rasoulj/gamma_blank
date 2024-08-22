import React, {memo} from 'react';
import {useController} from 'react-hook-form';
import {
  useDrawer,
  Layer,
  CustomDaySelectionSheet,
  DropDown,
} from '~/components';
import {WorkingScheduleRepeatType} from './enums';

const RepeatScheduleDropDown = ({
  name,
  index,
}: {
  name: string;
  index?: string;
}) => {
  const {isOpen, setIsOpen} = useDrawer(`CustomDate${index}`);
  const {field: repeatField} = useController({
    name: `${name}.${index}.repeatType`,
  });
  const {field: dayField} = useController({name: `${name}.${index}.dayOfWeek`});
  const {field: repeatEveryTypeField} = useController({
    name: `${name}.${index}.repeatEveryType`,
  });
  const {field: repeatEveryValueField} = useController({
    name: `${name}.${index}.repeatEveryValue`,
  });
  const {field: endsOnField} = useController({name: `${name}.${index}.endsOn`});
  const {field: endsAfterField} = useController({
    name: `${name}.${index}.endsAfter`,
  });
  let currentDay =
    dayField?.value?.label ??
    dayField?.value?.value?.toLowerCase?.()?.charAt(0).toUpperCase?.() +
      dayField?.value?.value?.toLowerCase?.()?.slice(1);
  const data = [
    {
      value: WorkingScheduleRepeatType.Weekly,
      label: `Weekly on ${currentDay}`,
    },
    {
      value: WorkingScheduleRepeatType.FourthWeekOfMonth,
      label: `Monthly on the forth ${currentDay}`,
    },
    {
      value: WorkingScheduleRepeatType.LastWeekOfMonth,
      label: `Monthly on the last ${currentDay}`,
    },
    // {
    //   value: WorkingScheduleRepeatType.FirstWeekOfMonth,
    //   label: `Annually on ${dayField?.value?.label} 02`,
    // },
    {value: WorkingScheduleRepeatType.Custom, label: `Custom`},
  ];
  const onToggleSheet = () => setIsOpen(!isOpen);
  const onChangeValue = (value: any) => {
    if (value === WorkingScheduleRepeatType.Custom) {
      onToggleSheet();
    }
  };
  const onDonePress = formData => {
    repeatEveryTypeField.onChange(formData?.repeatEveryType);
    repeatEveryValueField.onChange(formData?.repeatEveryValue);
    endsOnField.onChange(formData?.endsOn);
    endsAfterField.onChange(formData?.endsAfter);
    console.log({formData});
  };
  return (
    <>
      <Layer
        style={{
          width: '100%',
          alignSelf: 'center',
          position: 'relative',
          marginTop:-12
        }}>
        {dayField?.value?.value && (
          <DropDown
            key="12"
            data={dayField?.value?.value ? data : []}
            name={`${name}.${index}.repeatType`}
            onChangeValue={onChangeValue}
            style={{borderRadius: 10}}
            label="Repeat"
          />
        )}
      </Layer>
      <CustomDaySelectionSheet
        onDone={onDonePress}
        dayValue={dayField?.value?.value}
        index={index}
        value={{
          repeatEveryValue: repeatEveryValueField?.value,
          repeatEveryType: {
            value: repeatEveryTypeField?.value?.value,
            label: repeatEveryTypeField?.value?.label,
          },
          endsOn: endsOnField?.value,
          endsAfter: endsAfterField?.value,
        }}
      />
    </>
  );
};
export default memo(RepeatScheduleDropDown);
