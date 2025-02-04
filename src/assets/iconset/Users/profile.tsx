import * as React from 'react';
import theme, {getTextColor} from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function ProfileIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="profile"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <G id="profile-2" data-name="profile" transform="translate(-108 -252)">
        <Path
          id="Vector"
          d="M4.6,8.87a1.818,1.818,0,0,0-.33,0,4.445,4.445,0,1,1,.33,0Z"
          transform="translate(115.56 254)"
          fill={props?.fill || "none"}
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M1.815,1.373c-2.42,1.62-2.42,4.26,0,5.87a9.766,9.766,0,0,0,10.01,0c2.42-1.62,2.42-4.26,0-5.87A9.812,9.812,0,0,0,1.815,1.373Z"
          transform="translate(113.345 265.188)"
          fill={props?.fill || "none"}
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(132 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
