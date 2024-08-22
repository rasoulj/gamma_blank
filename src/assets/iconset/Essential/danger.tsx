import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function DangerIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      id="danger"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G id="danger-2" data-name="danger" transform="translate(-428 -252)">
        <Path
          id="Vector"
          d="M0,0V5"
          transform="translate(440 261)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M10,18.817H3.939c-3.47,0-4.92-2.48-3.24-5.51l3.12-5.62,2.94-5.28c1.78-3.21,4.7-3.21,6.48,0l2.94,5.29,3.12,5.62c1.68,3.03.22,5.51-3.24,5.51H10Z"
          transform="translate(430.001 254.592)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H.009"
          transform="translate(439.995 269)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(428 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
