import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function TickIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      id="tick"
      xmlns="http://www.w3.org/2000/svg"
      width={'24'}
      height={'24'}
      viewBox="0 0 24 24"
      {...props}>
      <G id="tick-circle" transform="translate(-748 -188)">
        <Path
          id="Vector"
          d="M0,5.454l5.454,5.454L16.381,0"
          transform="translate(751.809 194.546)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={props?.strokeWidth ?? '1.75'}
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(748 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
