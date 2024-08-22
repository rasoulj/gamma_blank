import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {isDark} from '~/utils/methods';

export default function AddIconSet(props: SvgProps) {
  const color = props.color
    ? getColor({color: props.color, theme})
    : isDark()
    ? '#fff'
    : '#292d32';

  return (
    <Svg
      {...props}
      id="add"
      xmlns="http://www.w3.org/2000/svg"
      width={props?.width || "24"}
      height={props?.height || "24"}
      viewBox="0 0 24 24">
      <G id="add-2" data-name="add" transform="translate(-492 -252)">
        <Path
          id="Vector"
          d="M0,0H12"
          transform="translate(498 264)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,12V0"
          transform="translate(504 258)"
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
          transform="translate(492 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
