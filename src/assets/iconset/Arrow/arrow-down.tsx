import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function ArrowDownIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="arrow-down"
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || '24'}
      height={props?.height || '24'}
      viewBox="0 0 24 24">
      <G
        id="arrow-down-2"
        data-name="arrow-down"
        transform="translate(-236 -252)">
        <Path
          id="Vector"
          d="M15.84,0,9.32,6.52a1.986,1.986,0,0,1-2.8,0L0,0"
          transform="translate(240.08 260.95)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(260 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
