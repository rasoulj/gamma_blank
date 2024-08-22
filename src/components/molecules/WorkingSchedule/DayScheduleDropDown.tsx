import React, {memo, useEffect} from 'react';
import {DropDown, Layer} from '~/components';
import {useController} from 'react-hook-form';

const dayNames = [
  {value: 'SATURDAY', label: 'Saturday'},
  {value: 'SUNDAY', label: 'Sunday'},
  {value: 'MONDAY', label: 'Monday'},
  {value: 'TUESDAY', label: 'Tuesday'},
  {value: 'WEDNESDAY', label: 'Wednesday'},
  {value: 'THURSDAY', label: 'Thursday'},
  {value: 'FRIDAY', label: 'Friday'},
];
const DayScheduleDropDown = ({
  name,
  index,
  setDay,
}: {
  name: string;
  index?: string;
  setDay?: any;
}) => {
  const {field: repeatField} = useController({
    name: `${name}.${index}.repeatType`,
  });
  const {field: dayField} = useController({name: `${name}.${index}.dayOfWeek`});
  const onChangeValue = (value: any) => {
    console.log(dayField?.value?.value?.label);
    
    setDay?.(dayField?.value?.value?.label);
    // repeatField.onChange(undefined);
  };
  console.log("dayField",dayField);
  
  return (
    <Layer
      style={{
        width: '100%',
        alignSelf: 'center',
        position: 'relative',
      }}>
      <DropDown
        key="13"
        data={dayNames}
        name={`${name}.${index}.dayOfWeek`}
        // onChangeValue={onChangeValue}
        style={{borderRadius: 10, backgroundColor: 'primary.500'}}
        label="Choose a day"
      />
    </Layer>
  );
};
export default memo(DayScheduleDropDown);
