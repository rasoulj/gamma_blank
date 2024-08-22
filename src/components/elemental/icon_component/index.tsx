import React from 'react';
import * as Element from '~/components/elemental';
import {Text, TouchableOpacity} from 'react-native';

export default function Icon({children, onPress, ...rest}) {
  const Icon = Element[children];

  const icon = Icon ? (
    <Icon {...rest} />
  ) : (
    <Text>{typeof children === 'string' ? children : ''} Icon not found!</Text>
  );

  return typeof onPress === 'function' ? (
    <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>
  ) : (
    icon
  );
}
