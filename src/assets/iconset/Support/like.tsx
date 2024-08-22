import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function LikeIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="like"
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || '24'}
      height={props?.height || '24'}
      viewBox="0 0 24 24">
      <G id="like-2" data-name="like" transform="translate(-300 -188)">
        <Path
          id="Vector"
          d="M0,15.7l3.1,2.4a3.077,3.077,0,0,0,1.9.6H8.8a3,3,0,0,0,2.8-2.1L14,9.3a1.874,1.874,0,0,0-1.9-2.6h-4a1.009,1.009,0,0,1-1-1.2l.5-3.2A1.973,1.973,0,0,0,6.3.1,2,2,0,0,0,4.1.8L0,6.9"
          transform="translate(307.48 190.648)"
          fill={props?.fill || 'none'}
          stroke={getColor({theme, color})}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,11.7V1.9C0,.5.6,0,2,0H3C4.4,0,5,.5,5,1.9v9.8c0,1.4-.6,1.9-2,1.9H2C.6,13.6,0,13.1,0,11.7Z"
          transform="translate(302.38 194.65)"
          fill={props?.fill || 'none'}
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(300 188)"
          fill={props?.fill || 'none'}
          opacity="0"
        />
      </G>
    </Svg>
  );
}
