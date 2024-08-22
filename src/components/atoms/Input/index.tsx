import React, {Fragment, useState} from 'react';
import {
  Pressable,
  ViewStyle,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import * as Elemental from '~/components/elemental';
import {IInputGroupProps} from 'native-base/lib/typescript/components/primitives/Input';
import {useUpdateFormulaData, updateFormulaData} from '~/components';
import {
  Input as TextInput,
  IInputProps,
  InputGroup as TextInputGroup,
  InputLeftAddon as TextInputLeftAddon,
  InputRightAddon as TextInputRightAddon,
  View,
} from 'native-base';
import {applyColorTo, getTextColor} from '~/theme';
import {scale} from '~/components/elemental';

interface IProps extends IInputProps {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  btnGroupProps?: IInputGroupProps;
  startIcon: string;
  endIcon?: string;
  onPress?: any;
  onChange: any;
  formulaItemIndex?: number;
  multi?: boolean;
  onPressEndIcon?: () => void;
  style: ViewStyle;
  color?: string;
  backgroundColor?: string;
  label?: string;
  required?: boolean;
}
const Input = ({
  style = {},
  onPress,
  onChange,
  backgroundColor,
  label,
  required = false,
  ...props
}: Partial<IProps>) => {
  let input;

  const {
    left,
    right,
    top,
    bottom,
    width,
    height,
    position,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    ...rest
  } = style;

  const StartIcon = Elemental[props?.startIcon] || Elemental['SearchIcon'];
  const EndIcon = Elemental[props?.endIcon || 'EventFilterIcon'];

  const [isFocused, setIsFocused] = useState(false);

  useUpdateFormulaData({...props, children: props.value});

  Elemental.globalValiables[props['data-id']] =
    props.value || Elemental.globalValiables[props['data-id']];

  if (props.startIcon || props.endIcon) {
    input = (
      <InputGroup {...props.btnGroupProps}>
        {props.startIcon && <StartIcon />}
        <TextInput {...props} style={{...rest}} />
        {props.endIcon && <EndIcon />}
      </InputGroup>
    );
  }

  input = (
    <Fragment>
      {label && (
        <Elemental.Typography
          color={isFocused ? 'primary.500' : 'gray.800'}
          style={[styles.InputLabel]}
          mb={'1'}
          fontWeight={'500'}>
          {label}
          {required && (
            <Elemental.Typography
              color={'error.500'}
              fontWeight={'500'}
              fontSize="lg">
              {'*'}
            </Elemental.Typography>
          )}
        </Elemental.Typography>
      )}
      <TextInput
        {...(props.startIcon && {
          InputLeftElement: <StartIcon style={styles.iconLeft} />,
        })}
        {...(props.endIcon && {
          InputRightElement: (
            <TouchableWithoutFeedback onPress={props?.onPressEndIcon}>
              <EndIcon style={styles.iconRight} />
            </TouchableWithoutFeedback>
          ),
        })}
        onChangeText={text => {
          if (props['formula-id']) {
            updateFormulaData({
              ...props,
              children: text === undefined ? '' : text,
              formulaId: props['formula-id'],
            });
          }

          Elemental.globalValiables[props['data-id']] = text;

          if (typeof onChange === 'function') onChange(text);
        }}
        style={[
          {
            borderRadius: Elemental.globalBorderRadius.input,
            color: props?.color
              ? props?.color
              : getTextColor(Elemental.getColor({color: 'background.500'})),
            maxHeight: props?.multiline
              ? 80
              : props?.multi
              ? scale(100)
              : scale(50),
            minHeight: 50,
            ...(props?.multi && {height: scale(100)}),
            fontSize: scale(13),
            ...rest,
          },
        ]}
        textAlignVertical={props?.multi ? 'top' : 'center'}
        multiline={props?.multi ? true : false}
        borderRadius={Elemental.globalBorderRadius?.input}
        borderColor={'gray.400'}
        placeholderTextColor={'gray.400'}
        bgColor={Elemental.getColor({
          color: backgroundColor ?? 'background.500',
        })}
        _focus={styles.focus}
        _input={{
          selectionColor: Elemental.getColor({color: 'primary.500'}),
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isReadOnly={props?.editable === false ? true : false}
        {...props}
      />
      {props?.maxLength && props?.multi && (
        <>
          <Elemental.Typography
            fontSize="xs"
            color={
              props?.value?.length >= props?.maxLength ? 'red.400' : 'gray.400'
            }
            position={'absolute'}
            bottom={2.5}
            right={2}>
            {props?.value?.length || 0}/{props?.maxLength}
          </Elemental.Typography>
          <Elemental.Divider bottom={2} w="95%" alignSelf={'center'} />
        </>
      )}
    </Fragment>
  );

  return onPress ? (
    <Pressable onPress={onPress}>{input}</Pressable>
  ) : (
    <View
      style={{
        left,
        right,
        top,
        bottom,
        width,
        height,
        position,
        margin,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
      }}>
      {input}
    </View>
  );
};

const InputGroup = (props: IInputGroupProps) => {
  return <TextInputGroup {...props} />;
};

const InputLeftAddon = (props: any) => {
  return <TextInputLeftAddon {...props} />;
};

const InputRightAddon = (props: any) => {
  return <TextInputRightAddon {...props} />;
};

Input.Group = InputGroup;
Input.RightAddon = InputRightAddon;
Input.LeftAddon = InputLeftAddon;

export default Input;

const styles = StyleSheet.create({
  InputLabel: {
    fontSize: 16,
    fontWeight: '600',
  },

  focus: {
    borderColor: 'primary.400',
  },

  iconLeft: {
    marginLeft: 24,
    color: applyColorTo(['modern'], {
      trueColor: getTextColor(Elemental.getColor({color: 'primary.500'})),
      falseColor: Elemental.getColor({color: 'gray.400'}),
    }),
  },

  iconRight: {
    marginRight: 24,
    color: applyColorTo(['modern'], {
      trueColor: getTextColor(Elemental.getColor({color: 'primary.800'})),
      falseColor: Elemental.getColor({color: 'gray.400'}),
    }),
  },
});
