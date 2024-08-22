import React from 'react';
import {IPressableProps, Pressable as NativePressable} from 'native-base';

interface IProps extends IPressableProps {
  children: React.ReactNode;
  actions?: [];
  handlePress?: any;
}

const Pressable = ({children, handlePress, actions = [], ...props}: IProps) => {
  return <NativePressable {...props}>{children}</NativePressable>;
};

export default Pressable;
