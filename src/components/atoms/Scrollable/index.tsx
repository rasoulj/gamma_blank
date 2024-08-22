import React, {cloneElement, Children, useEffect} from 'react';
import {IScrollViewProps, View} from 'native-base';
import Layer from '../Layer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
interface IProps extends IScrollViewProps {
  horizontal?: boolean;
}
const HEIGHT = 90;
const Scrollable = ({style = {}, ...props}: IProps) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      horizontal={props.horizontal}
      {...props}
      style={{...style, padding: style.padding || 5}}>
      {props.children}
    </KeyboardAwareScrollView>
  );
};
export default Scrollable;
