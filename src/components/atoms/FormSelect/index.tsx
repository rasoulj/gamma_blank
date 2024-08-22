import {View} from 'native-base';
import React from 'react';
import {useController, useFormContext} from 'react-hook-form';
import {SelectItem} from '../Select';
import SelectForm from '../SelectForm';
import Typography from '../Typography';
import theme from '~/theme';

export default function FormSelect({
  name,
  items = [],
  label,
  ...props
}: {
  options: Array<{value: string; label: string}>;
} & any) {
  const {field, fieldState} = useController({name});
  const {register} = useFormContext();
  console.log(fieldState.error);
  props.options = items;

  return (
    <View style={props.style}>
      <Typography>{label}</Typography>
      <SelectForm {...props} {...register(name)}>
        {props.options.map(({value, label}: any) => (
          <SelectItem key={label} bgColor="amber.200">
            <Typography>{label}</Typography>
          </SelectItem>
        ))}
      </SelectForm>
      {fieldState.error && <Typography>{fieldState.error.message}</Typography>}
    </View>
  );
}
