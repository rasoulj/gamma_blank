import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function VerifyIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="verify"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <G id="verify-2" data-name="verify" transform="translate(-748 -444)">
        <Path
          id="Vector"
          d="M0,2.42,2.41,4.84,7.24,0"
          transform="translate(756.38 453.58)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.745.442a2.015,2.015,0,0,1,2.52,0l1.58,1.36a2.216,2.216,0,0,0,1.26.47h1.7a1.938,1.938,0,0,1,1.93,1.93V5.9a2.243,2.243,0,0,0,.47,1.26l1.36,1.58a2.015,2.015,0,0,1,0,2.52l-1.36,1.58a2.216,2.216,0,0,0-.47,1.26v1.7a1.938,1.938,0,0,1-1.93,1.93h-1.7a2.243,2.243,0,0,0-1.26.47l-1.58,1.36a2.015,2.015,0,0,1-2.52,0L7.165,18.2a2.216,2.216,0,0,0-1.26-.47H4.175a1.938,1.938,0,0,1-1.93-1.93v-1.71a2.276,2.276,0,0,0-.46-1.25l-1.35-1.59a2.013,2.013,0,0,1,0-2.5l1.35-1.59a2.276,2.276,0,0,0,.46-1.25V4.192a1.938,1.938,0,0,1,1.93-1.93H5.9a2.243,2.243,0,0,0,1.26-.47Z"
          transform="translate(750.005 446.008)"
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
          transform="translate(748 444)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
