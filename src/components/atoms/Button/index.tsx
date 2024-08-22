import React from 'react';
import {Button as ElementalButton, IButtonProps, View} from 'native-base';
import {IButtonGroupProps} from 'native-base/lib/typescript/components/primitives/Button';
import * as Element from '~/components/elemental';

import Box from '../Box';
interface IProps extends IButtonProps {
  iconType?: string;
  leftIconName?: string;
  rightIconName?: string;
  iconStyle?: any;
  postAction?: () => {};
  preAction?: () => {};
}
const Button = ({onPress, postAction, preAction, ...props}: IProps) => {
  const {
    startIcon,
    endIcon,
    rightIconName,
    leftIconName,
    iconStyle,
    iconType = 'AntDesign',
    children,
    disabled: btnDisabled,
    style: {color, ...otherStyle} = {},
    ...rest
  } = props;

  const StartIcon = Element[startIcon];
  const EndIcon = Element[endIcon];

  if (leftIconName) {
    return (
      <ElementalButton
        {...rest}
        style={{
          borderRadius: Element.globalBorderRadius?.button,
          ...otherStyle,
        }}>
        {children}
      </ElementalButton>
    );
  }
  if (rightIconName) {
    return (
      <ElementalButton
        {...rest}
        style={{
          borderRadius: Element.globalBorderRadius?.button,
          ...otherStyle,
        }}
      />
    );
  }

  return (
    <ElementalButton
      _text={{
        ...(color || props?.color ? {color: color || props?.color} : {}),
        fontSize: otherStyle.fontSize,
        lineHeight: otherStyle.fontSize,
      }}
      {...(props?.colorScheme && {backgroundColor: props?.colorScheme})}
      startIcon={
        StartIcon && <StartIcon color={iconStyle?.color} style={iconStyle} />
      }
      {...rest}
      {...props}
      style={{
        borderRadius: Element.globalBorderRadius?.button,
        height: 49,
        ...otherStyle,
      }}
      {...(btnDisabled && {disabled: true})}
      {...(props?.title && {children: props?.title})}
      onPress={(...args) => {
        preAction?.();
        onPress?.(...args);
        setTimeout(() => postAction?.(), 100);
      }}
    />
  );
};
const ButtonGroup = (props: IButtonGroupProps) => {
  return <ElementalButton.Group {...props} />;
};
Button.Group = ButtonGroup;

export default Button;
