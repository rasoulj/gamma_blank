import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {getColor} from '~/components/elemental';

const MoreIcon = (props: SvgProps) => {
  const color = props.color || getColor({color: 'primary.400'}) || '#32e8b7';
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={26} height={22} {...props}>
      <G fill="none" stroke={color} strokeWidth={1.5} data-name="share">
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.89 8.19a2.78 2.78 0 1 1-2.78 2.78 2.78 2.78 0 0 1 2.78-2.78Z"
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.28 15.42a2.78 2.78 0 1 1-2.78 2.78 2.78 2.78 0 0 1 2.78-2.78ZM18.28 1.08a2.78 2.78 0 1 1-2.78 2.78 2.78 2.78 0 0 1 2.78-2.78Z"
          data-name="Vector"
        />
        <Path d="m15.5 5.5-7 4" data-name="Line 1" />
        <Path d="m15.5 16.5-7-4" data-name="Line 2" />
      </G>
    </Svg>
  );
};

export default MoreIcon;
