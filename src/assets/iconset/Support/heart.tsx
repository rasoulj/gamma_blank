import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function HeartIconSet(props: SvgProps) {
  const {fill, color: customColor, strokeWidth} = props;
  const color =
    getColor({color: customColor, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="heart"
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || '24'}
      height={props?.height || '24'}
      viewBox="0 0 24 24">
      <G id="heart-2" data-name="heart" transform="translate(-236 -188)">
        <Path
          id="Vector"
          d="M10.62,17.71a2.181,2.181,0,0,1-1.24,0C6.48,16.72,0,12.59,0,5.59A5.574,5.574,0,0,1,5.56,0,5.515,5.515,0,0,1,10,2.24,5.547,5.547,0,0,1,20,5.59C20,12.59,13.52,16.72,10.62,17.71Z"
          transform="translate(238 191.1)"
          fill={props?.fill || getColor({theme, color: 'background.400'})}
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth ?? '1.5'}
        />
        <Path
          id="Vector-2"
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
