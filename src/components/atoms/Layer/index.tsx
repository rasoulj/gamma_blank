import React, {Children} from 'react';
import {KeyboardAvoidingView, View} from 'native-base';
import {Pressable, TouchableOpacity, ViewStyle} from 'react-native';
import {useTypography} from '../../elemental';

const Layer = ({
  children,
  keyboardAvoidingView,
  behavior,
  keyboardVerticalOffset,
  ...props
}: {
  children?: any;
  keyboardAvoidingView?: any;
  behavior?: any;
  keyboardVerticalOffset?: any;
  style?: ViewStyle;
  onPress?: () => void;
}) => {
  const newChildren = useTypography(children, props?.style?.backgroundColor);

  if (keyboardAvoidingView) {
    return (
      <KeyboardAvoidingView
        behavior={behavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{position: 'relative'}}>
        <View {...props}>{children}</View>
      </KeyboardAvoidingView>
    );
  }
  return props.onPress ? (
    <TouchableOpacity onPress={props.onPress} {...props}>
      {newChildren}
    </TouchableOpacity>
  ) : (
    <View position={'relative'} {...props}>
      {newChildren}
    </View>
  );
};

export default Layer;
