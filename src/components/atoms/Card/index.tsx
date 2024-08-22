import React from 'react';
import RelativeLayout from '../RelativeLayout';
import theme from '~/theme';
import {applyColorTo} from '~/utils/helper';

export default function Card(props: any) {
  return (
    <RelativeLayout
      // backgroundColor={props.colorScheme || theme?.colors?.background?.['400']}
      // backgroundColor={'background.400'}
      backgroundColor={applyColorTo(['simple', 'friendly'], {
        trueColor: 'background.500',
        falseColor: 'background.400',
      })}
      {...props}
    />
  );
}
