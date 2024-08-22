import React from 'react';
import {View, KeyboardAvoidingView, HStack, Stack} from 'native-base';
import {TouchableOpacity, TouchableWithoutFeedback, ViewStyle} from 'react-native';
import theme from '~/theme';
import VStack from '../VStack';
import {getColor} from '../../elemental/helper';
import {useTypography} from '../../elemental';
import {IHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import {IVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';

type IProps = {
  onPress?: any;
  avoidKeyborad?: string | boolean;
  behavior?: 'height' | 'position' | 'padding';
  keyboardVerticalOffset?: number;
  style?: ViewStyle;
  children: any;
  colorScheme?: any;
  disabled?: boolean;
} & (IHStackProps & IVStackProps);

export default function RelativeLayout({
  style = {},
  children,
  onPress,
  avoidKeyborad = false,
  behavior,
  keyboardVerticalOffset,
  colorScheme,
  disabled,
  ...props
}: IProps) {
  const pattern = /color/gi;
  Object.entries(style)?.forEach?.(([key, value]) => {
    if (key?.match?.(pattern)) {
      style[key] = getColor({color: value, theme});
    }
  });

  const newChildren = useTypography(
    children,
    props?.backgroundColor || props?.style?.backgroundColor || props?.bgColor,
  );

  const background = colorScheme
    ? getColor({theme, color: colorScheme})
    : 'transparent';

  const shadow =
    style?.boxShadow || getColor({color: theme?.shadows?.default, theme});

  const borderColor = getColor({
    color: theme?.components?.RelativeLayout?.borderColor?.default,
    theme,
  });
  const borderWidth = theme?.components?.RelativeLayout?.borderWidths?.default;
  if (onPress) {
    return (
      <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
        <View
          shadow={shadow}
          borderColor={borderColor}
          borderWidth={borderWidth}
          background={background}
          {...props}
          style={{padding: style.padding || 5, ...style}}>
          {newChildren}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  let layout =
    style?.flexDirection === 'row' ? (
      <HStack
        background={background}
        shadow={shadow}
        borderColor={borderColor}
        borderWidth={borderWidth}
        style={{padding: style.padding || 5, ...style}}
        space={style?.columnGap || style?.gap}
        {...props}>
        {newChildren}
      </HStack>
    ) : (
      <VStack
        background={background}
        shadow={shadow}
        borderColor={borderColor}
        borderWidth={borderWidth}
        style={{padding: style.padding || 5, ...style}}
        space={style?.rowGap || style?.gap}
        {...props}>
        {newChildren}
      </VStack>
    );

  return avoidKeyborad === false || avoidKeyborad === 'false' ? (
    layout
  ) : (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={style}
      {...props}>
      {layout}
    </KeyboardAvoidingView>
  );
}
