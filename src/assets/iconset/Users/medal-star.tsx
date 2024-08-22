import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function MedalStarIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="medal-star"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <G
        id="medal-star-2"
        data-name="medal-star"
        transform="translate(-684 -252)">
        <Path
          id="Vector"
          d="M14,7a6.953,6.953,0,0,1-5.95,6.91,6.17,6.17,0,0,1-2.1,0A7,7,0,1,1,14,7Z"
          transform="translate(689 254)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M19.271,5.57l-1.65.39a.981.981,0,0,0-.74.74l-.35,1.47a1,1,0,0,1-1.74.41L10.021,3.1,5.251,8.59a1,1,0,0,1-1.74-.41l-.35-1.47a1,1,0,0,0-.74-.74L.771,5.58A1,1,0,0,1,.291,3.9L4.191,0a6.985,6.985,0,0,0,4.78,3.02,6.031,6.031,0,0,0,1.05.09,6.031,6.031,0,0,0,1.05-.09A6.985,6.985,0,0,0,15.851,0l3.9,3.9A1,1,0,0,1,19.271,5.57Z"
          transform="translate(685.979 264.9)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3.894.48l.59,1.18a.724.724,0,0,0,.48.35l1.07.18c.68.11.84.61.35,1.1l-.83.83a.709.709,0,0,0-.17.61l.24,1.03c.19.81-.24,1.13-.96.7l-1-.59a.7.7,0,0,0-.66,0L2,6.46c-.72.42-1.15.11-.96-.7l.24-1.03a.751.751,0,0,0-.17-.61l-.83-.83c-.49-.49-.33-.98.35-1.1L1.7,2.01a.729.729,0,0,0,.47-.35L2.764.48C3.054-.16,3.574-.16,3.894.48Z"
          transform="translate(692.686 257.5)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(684 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
