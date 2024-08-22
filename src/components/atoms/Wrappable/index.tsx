import React, {Children} from 'react';
import {HStack} from 'native-base';
import {ViewStyle} from 'react-native';

interface IProps {
  children: any;
  style: ViewStyle;
  space?: number;
  separator?: React.ReactElement<any>;
}

function Wrappable({children, style = {}, space, separator}: IProps) {
  return (
    <HStack
      space={space || 2}
      style={{
        ...style,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {Children.toArray(children)
        .map((child: any, index) => {
          delete child?.props?.style.top;
          delete child?.props?.style.left;
          delete child?.props?.style.right;
          delete child?.props?.style.bottom;
          delete child?.props?.style.position;

          return child;
        })
        .reduce((prev, curr, index) => [prev, separator, curr])}
    </HStack>
  );
}

export default Wrappable;
