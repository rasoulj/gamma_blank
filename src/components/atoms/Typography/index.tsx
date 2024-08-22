import React from 'react';
import theme, {getTextColor} from '~/theme';
import {ITextProps, Text} from 'native-base';
import {globalValiables} from '~/components/elemental';
import {useUpdateFormulaData} from '../../elemental';
import {getColor} from '../../elemental/helper';

interface IProps extends ITextProps {
  center?: 'vertical' | 'horizontal' | 'both';
  onClick?: ITextProps['onPress'];
  formulaItemIndex?: number;
  fontSize?: string;
  bgColor?: string;
  currencySymbol?: string;
  parentBgColor?: string;
}

const Size = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

export default function Typography({
  style = {},
  bgColor = 'primary.500',
  color,
  parentBgColor,
  ...props
}: IProps) {
  useUpdateFormulaData(props);

  globalValiables[props['data-id']] = props.children;

  if (style?.fontWeight && typeof style?.fontWeight === 'number') {
    style.fontWeight = style.fontWeight.toString();
  }

  const ref: any = React.useRef();

  const {color: styleColor, ...rest} = style as any;

  let textColor = '';
  if (parentBgColor) {
    textColor = getTextColor(getColor({color: parentBgColor}));
  }
  if (props.onClick && !props.onPress) props.onPress = props.onClick;

  return (
    <Text
      // onLayout={e => console.log(e)}
      ref={ref}
      style={[
        {color: getTextColor(getColor({color: 'background.500'}))},
        styleColor ||
          (color && {color: getColor({color: styleColor || color, theme})}),
        {fontSize: Size[props?.fontSize as any] || 16},
        rest,
      ]}
      {...props}>
      {props.currencySymbol && props.currencySymbol}
      {props.children}
    </Text>
  );
}
