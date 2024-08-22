import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function SlashIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      id="slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G id="slash-2" data-name="slash" transform="translate(-620 -316)">
        <Path
          id="Vector"
          d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20Z"
          transform="translate(622 318)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={props?.strokeWidth ?? '1.5'}
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M14,0,0,14"
          transform="translate(624.9 321)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={props?.strokeWidth ?? '1.5'}
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(620 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
