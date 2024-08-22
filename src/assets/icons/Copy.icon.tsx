import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {getColor, theme} from '~/components/elemental';

const CopyIcon = (props: SvgProps) => {
  const color =
    props.color ||
    getColor({color: theme?.components?.Icon?.color?.default, theme}) ||
    '#292d32';
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path d="M16 12.9v4.2c0 3.5-1.4 4.9-4.9 4.9H6.9C3.4 22 2 20.6 2 17.1v-4.2C2 9.4 3.4 8 6.9 8h4.2c3.5 0 4.9 1.4 4.9 4.9Z" />
        <Path
          data-name="Vector"
          d="M22 6.9v4.2c0 3.5-1.4 4.9-4.9 4.9H16v-3.1C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2h4.2C20.6 2 22 3.4 22 6.9Z"
        />
      </G>
    </Svg>
  );
};
export default CopyIcon;
