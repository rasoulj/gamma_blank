import {ITextProps, Text} from 'native-base';
import React from 'react';
import theme, {getTextColor} from '~/theme';

import {
  Linking,
  TextStyle,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigate, useUpdateFormulaData} from '../../elemental';
import {getColor} from '../../elemental/helper';

interface IProps extends ITextProps {
  center?: 'vertical' | 'horizontal' | 'both';
  onClick?: ITextProps['onPress'];
  formulaItemIndex?: number;
  fontSize?: string;
  bgColor?: string;
  currencySymbol?: string;
  parentBgColor?: string;
  style?: TextStyle;
  pressable?: boolean;
  onPressNavigate?: (name, params) => void;
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

export default function Description({
  style = {},
  bgColor = 'primary.500',
  color,
  parentBgColor,
  pressable,
  onPressNavigate,
  ...props
}: IProps) {
  useUpdateFormulaData(props);
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

  const Navigator = item => {
    const splitItem = item.split('/');
    if (item.includes('https://') || item.includes('http://')) {
      Linking.openURL(item.replace(/\s/g, ''));
    } else if (item?.includes('/product')) {
      onPressNavigate?.('product detail', {productId: Number(splitItem[2])});
    } else if (item?.includes('/event')) {
      onPressNavigate?.('event detail', {eventId: Number(splitItem[2])});
    } else if (item?.includes('/post')) {
      onPressNavigate?.('post detail', {postId: Number(splitItem[2])});
    }
  };
  return (
    <Text
      // onLayout={e => console.log(e)}
      ref={ref}
      style={[
        styleColor ||
          (color && {color: getColor({color: styleColor || color, theme})}),
        {fontSize: Size[props?.fontSize as any] || 16},
        rest,
      ]}
      {...props}>
      {props.currencySymbol && props.currencySymbol}
      {props?.children &&
        String(props?.children)
          .split(' ' || '\n')
          .map(item => {
            return (
              <TouchableWithoutFeedback
                style={{flexDirection:"row"}}
                onPress={() => (pressable ? Navigator(item) : {})}>
                <Text
                  key={item}
                  selectable={pressable}
                  selectionColor="red"
                  color={
                    item?.includes('/product') ||
                    item?.includes('/event') ||
                    item?.includes('/post') ||
                    item?.includes('http://') ||
                    item?.includes('https://')
                      ? '#059'
                      : styleColor
                  }>
                  {item + ' '}
                </Text>
              </TouchableWithoutFeedback>
            );
          })}
    </Text>
  );
}
