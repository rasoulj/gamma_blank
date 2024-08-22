import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function DiscoverIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="discover"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <G id="discover-2" data-name="discover" transform="translate(-428 -508)">
        <Path
          id="Vector"
          d="M15.867.167l-9.93,2.49a4.942,4.942,0,0,0-3.28,3.28l-2.49,9.93c-.75,3,1.09,4.85,4.1,4.1l9.93-2.48a4.982,4.982,0,0,0,3.28-3.28l2.49-9.94C20.717,1.267,18.867-.583,15.867.167Z"
          transform="translate(429.933 509.933)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M7,3.5A3.5,3.5,0,1,1,3.5,0,3.5,3.5,0,0,1,7,3.5Z"
          transform="translate(436.5 516.5)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(428 508)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
