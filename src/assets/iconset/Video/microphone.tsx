import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function MicrophoneIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      id="microphone"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G id="microphone-2" transform="translate(-236 -188)">
        <Path
          id="Vector"
          d="M4,13.5a4,4,0,0,0,4-4V4A4,4,0,0,0,0,4V9.5A4,4,0,0,0,4,13.5Z"
          transform="translate(244 190)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0V1.7a7.65,7.65,0,1,0,15.3,0V0"
          transform="translate(240.35 197.65)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,.248a4.027,4.027,0,0,1,2.78,0"
          transform="translate(246.61 194.182)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,.105a3.138,3.138,0,0,1,1.61,0"
          transform="translate(247.2 196.445)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0V3"
          transform="translate(248 207)"
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
          transform="translate(236 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
