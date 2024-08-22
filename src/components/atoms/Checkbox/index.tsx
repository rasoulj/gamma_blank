import React from 'react';
import theme from '~/theme';
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
  value: string;
}

const Checkbox = (props: IProps) => {
  const {field} = useController({name: props?.name || ''});

  return (
    <NativeCheckBox
      // value={field.value || props.value}
      {...field}
      isChecked={field.value}
      onChange={e => {
        console.log(e);
        field.onChange(e);
      }}
      accessibilityLabel={props.name}
      flexDirection="row"
      {...props}>
      <Text style={[props.style, props.textStyle]}>
        {props.name || props.accessibilityLabel}
      </Text>
    </NativeCheckBox>
  );
};

Checkbox.Group = function (props: ICheckboxGroupProps) {
  return <NativeCheckBox.Group {...props} />;
};

export default Checkbox;
