import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function VolumeSlashIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      id="volume-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G
        id="volume-slash-2"
        data-name="volume-slash"
        transform="translate(-430 -188)">
        <Path
          id="Vector"
          d="M13,4.212v-.96c0-2.98-2.07-4.12-4.59-2.54L5.49,2.542a2.1,2.1,0,0,1-1.06.3H3a2.652,2.652,0,0,0-3,3v4a2.652,2.652,0,0,0,3,3H5"
          transform="translate(432 192.158)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,6.18c2.52,1.58,4.59.43,4.59-2.54V0"
          transform="translate(440.41 200.95)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M.81,0A6.673,6.673,0,0,1,0,6.58"
          transform="translate(448 197.42)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M1.32,0A10.82,10.82,0,0,1,0,10.7"
          transform="translate(449.83 195.8)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M20,0,0,20"
          transform="translate(432 190)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(430 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
