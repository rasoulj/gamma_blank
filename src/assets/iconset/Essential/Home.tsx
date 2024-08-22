import * as React from 'react';
import theme, {getTextColor} from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function HomeIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="Home"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <G id="home-2" transform="translate(-620 -188)">
        <Path
          id="Vector"
          d="M7.02.823l-5.39,4.2A4.759,4.759,0,0,0,0,8.343v7.41a4.225,4.225,0,0,0,4.21,4.22H15.79A4.223,4.223,0,0,0,20,15.763V8.483a4.723,4.723,0,0,0-1.8-3.45L12.02.7A4.487,4.487,0,0,0,7.02.823Z"
          transform="translate(622 190.017)"
          fill={props?.fill || 'none'}
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,3V0"
          transform="translate(632 202.99)"
          fill={'none'}
          stroke={
            props?.fill
              ? getColor({color: 'background.500'})
              : getColor({theme, color})
          }
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(620 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
