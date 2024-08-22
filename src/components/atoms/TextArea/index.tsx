import React from 'react';
import {
  TextArea as TextAreaInput,
  IInputProps,
  InputGroup as TextInputGroup,
  InputLeftAddon as TextInputLeftAddon,
  InputRightAddon as TextInputRightAddon,
  View,
} from 'native-base';
import {IInputGroupProps} from 'native-base/lib/typescript/components/primitives/Input';
import {useController, useForm} from 'react-hook-form';
import {getColor} from '../../elemental/helper';
import {ViewStyle} from 'react-native';
import {getTextColor} from '~/theme';

interface IProps extends IInputProps {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  btnGroupProps?: IInputGroupProps;
  style: ViewStyle;
}
const TextArea = ({style = {}, ...props}: IProps) => {
  let input;
  const {name} = props;
  const {control} = useForm({mode: 'onChange'});
  const {field, fieldState} = useController({name, control});

  const {
    left,
    right,
    top,
    bottom,
    width,
    height,
    position,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    ...rest
  } = style;

  if (props.leftAddon || props.rightAddon) {
    input = (
      <InputGroup {...props.btnGroupProps}>
        {props.leftAddon}
        <TextAreaInput
          onChangeText={field.onChange}
          value={field.value}
          {...props}
          style={rest}
          _focus={{borderColor: getColor({color: 'primary.400'})}}
          placeholderTextColor={getColor({color: 'background.700'})}
        />
        {props.rightAddon}
      </InputGroup>
    );
  }
  input = (
    <TextAreaInput
      backgroundColor={'transparent'}
      onChangeText={field?.onChange}
      value={field.value}
      {...props}
      style={rest}
      color={getTextColor(getColor({color: 'background.500'}))}
      _focus={{borderColor: getColor({color: 'primary.400'})}}
      placeholderTextColor={getColor({color: 'gray.500'})}
    />
  );
  return (
    <View
      style={{
        left,
        right,
        top,
        bottom,
        width,
        height,
        position,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      }}>
      {input}
    </View>
  );
};

export default TextArea;
