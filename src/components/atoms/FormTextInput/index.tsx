import React, {ForwardedRef, useEffect} from 'react';
import {
  IInputProps,
  InputGroup as TextInputGroup,
  InputLeftAddon as TextInputLeftAddon,
  InputRightAddon as TextInputRightAddon,
  View,
} from 'native-base';
import {IInputGroupProps} from 'native-base/lib/typescript/components/primitives/Input';
import {withMeasure} from '~/components/Wrapper';
import {ViewStyle} from 'react-native';
import {useController} from 'react-hook-form';
import {getColor} from '../../elemental/helper';
import {getTextColor} from '~/theme';
import {Input as TextInput} from '../../elemental';
import {print} from '../../elemental';
interface IProps extends IInputProps {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  btnGroupProps?: IInputGroupProps;
  style: ViewStyle;
}
const FormTextInput = React.forwardRef(
  ({style = {}, ...props}: IProps, ref: ForwardedRef<any>) => {
    let input;
    const {name} = props;

    const {field, fieldState} = useController({name});

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
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            placeholderTextColor={getColor({color: 'background.500'})}
            _focus={{borderColor: getColor({color: 'primary.400'})}}
            autoFocus={props?.isFocused}
            {...props}
            style={rest}
          />
          {props.rightAddon}
        </InputGroup>
      );
    }
    const inputRef = React.useRef(null);

    React.useEffect(() => {
      if (props?.isFocus) {
        inputRef?.current?.focus();
      }
    }, [props?.isFocus]);

    input = (
      <TextInput
        ref={inputRef}
        value={field.value}
        onChangeText={field.onChange}
        style={rest}
        _focus={{borderColor: getColor({color: 'primary.400'})}}
        // autoFocus={props?.isFocus}
        isFocused={props.isFocus}
        {...props}
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
          backgroundColor: 'transparent',
        }}>
        {input}
      </View>
    );
  },
);

const InputGroup = (props: IInputGroupProps) => {
  return <TextInputGroup {...props} />;
};
const InputLeftAddon = (props: any) => {
  return <TextInputLeftAddon {...props} />;
};
const InputRightAddon = (props: any) => {
  return <TextInputRightAddon {...props} />;
};
const withMeasureInputLeftAddon = withMeasure(InputLeftAddon);
const withMeasureInputRightAddon = withMeasure(InputRightAddon);
export {withMeasureInputLeftAddon, withMeasureInputRightAddon};
export default FormTextInput;
