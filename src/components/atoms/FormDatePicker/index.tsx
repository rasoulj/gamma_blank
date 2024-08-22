import React from 'react';
import {useFormContext} from 'react-hook-form';
import {View} from 'react-native';
import SelectDate from '../SelectDate';

const FormDatePicker = ({name, ...props}) => {
  const {register} = useFormContext();

  return (
    <View style={props.style}>
      <SelectDate {...props} {...register(name)} />
    </View>
  );
};

export default FormDatePicker;
