import React from 'react';

import {
  Checkbox as NativeCheckBox,
  ICheckboxProps,
  ICheckboxGroupProps,
  Text,
} from 'native-base';
import {TextStyle} from 'react-native';
import {useController} from 'react-hook-form';
interface IProps extends ICheckboxProps {
  accessibilityLabel: string;
  textStyle?: TextStyle;
  name: string;
}

const FormCheckbox = (props: IProps) => {
  const {field} = useController({name: props.name});
  console.log(props.textStyle);
  return (
    <NativeCheckBox
      value={props?.value || field?.value}
      onChange={field.onChange}
      {...props}>
      <Text style={[props.textStyle]}>{props.accessibilityLabel}</Text>
    </NativeCheckBox>
  );
};

FormCheckbox.Group = function (props: ICheckboxGroupProps) {
  return <NativeCheckBox.Group {...props} />;
};

export default FormCheckbox;
