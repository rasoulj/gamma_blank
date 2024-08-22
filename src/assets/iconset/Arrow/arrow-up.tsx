import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function ArrowUpIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      width="24"
      height="24"
      {...props}
      id="arrow-up"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <G id="arrow-up-2" data-name="arrow-up" transform="translate(-172 -252)">
        <Path
          id="Vector"
          d="M15.84,7.1,9.32.577a1.986,1.986,0,0,0-2.8,0L0,7.1"
          transform="translate(176.08 259.953)"
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
          transform="translate(196 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
