import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function MessageIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      id="message"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G id="message-2" data-name="message" transform="translate(-684 -186)">
        <Path
          id="Vector"
          d="M6.5,17H6c-4,0-6-1-6-6V6Q0,0,6,0h8q6,0,6,6v5q0,6-6,6h-.5a1.014,1.014,0,0,0-.8.4l-1.5,2a1.421,1.421,0,0,1-2.4,0l-1.5-2A1.13,1.13,0,0,0,6.5,17Z"
          transform="translate(686 188)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M.495.5H.5"
          transform="translate(699.502 196.5)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M.495.5H.5"
          transform="translate(695.501 196.5)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M.495.5H.5"
          transform="translate(691.5 196.5)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(684 186)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
