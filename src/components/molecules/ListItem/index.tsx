import React, {cloneElement, Children} from 'react';
import {HStack, VStack} from 'native-base';
import {IFlatListProps} from 'native-base/lib/typescript/components/basic/FlatList';
import Box from '../../atoms/Box';
import {ViewStyle} from 'react-native';
import {getColor} from '../../elemental/helper';
import theme from '~/theme';
interface IProps {
  style?: ViewStyle;
  children: any;
  parent?: string;
  number?: number;
  itemStyle?: ViewStyle;
  selectedItemStyle?: ViewStyle & {color: string};
  numColumns?: number;
  selectedItem?: number;
  renderItem: any;
  horizontal?: 'true' | 'false';
  data: any;
}
const MAX_DATA_LENGTH = 100;
const ListItem = (props: IProps) => {
  const {
    style,
    children,
    parent,
    itemStyle,
    selectedItem,
    selectedItemStyle,
    number = MAX_DATA_LENGTH,
    numColumns,
    renderItem,
    data,
    horizontal,
    ...rest
  } = props;
  const {backgroundColor} = style;
  const bgColor = backgroundColor
    ? getColor({color: backgroundColor, theme})
    : 'transparent';

  return (
    <>
      {horizontal === 'true' ? (
        <HStack
          space={style?.gap || 2}
          style={{...style, backgroundColor: bgColor}}>
          {data
            ?.slice(0, Number(number))
            .map((item, index) => renderItem({item, index}))}
        </HStack>
      ) : (
        <VStack
          space={style?.gap || 2}
          style={{...style, backgroundColor: bgColor}}>
          {data
            ?.slice(0, Number(number))
            .map((item, index) => renderItem({item, index}))}
        </VStack>
      )}
    </>
  );
};
export default ListItem;
