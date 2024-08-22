import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function FlashIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      id="flash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G id="flash-2" data-name="flash" transform="translate(-428 -316)">
        <Path
          id="Vector"
          d="M1.368,11.281h3.09v7.2c0,1.68.91,2.02,2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76L.5,9.361C-.422,10.421-.032,11.281,1.368,11.281Z"
          transform="translate(432.722 317.999)"
          fill={props?.fill ?? 'none'}
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(428 316)"
          fill={props?.fill ?? 'none'}
          opacity="0"
        />
      </G>
    </Svg>
  );
}
