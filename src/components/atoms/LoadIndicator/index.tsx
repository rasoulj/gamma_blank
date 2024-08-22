import {Center} from 'native-base';
import React from 'react';
import {ActivityIndicator, ViewStyle} from 'react-native';
import {deviceHeight, getColor} from '../../elemental';
export default function LoadIndicator({
  height = deviceHeight,
  style
}: {
  height?: number | string;
  style?:ViewStyle
}) {
  return (
    <Center
      flex={1}
      position={'absolute'}
      width={'100%'}
      height={height || '100%'}
      zIndex={10}
      style={{
        backgroundColor: getColor({color: 'background.500'}) + '90',
        ...style
      }}>
      <ActivityIndicator
        size="large"
        color={getColor({color: 'primary.400'})}
      />
    </Center>
  );
}
