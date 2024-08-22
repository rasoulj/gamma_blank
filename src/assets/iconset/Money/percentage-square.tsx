import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function PercentageSquareIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      {...props}
      id="percentage-square"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <G
        id="Group_20954"
        data-name="Group 20954"
        transform="translate(-556 -252)">
        <Path
          id="Vector"
          d="M7,0h6c5,0,7,2,7,7v6c0,5-2,7-7,7H7c-5,0-7-2-7-7V7C0,2,2,0,7,0Z"
          transform="translate(558 254)"
          fill={props?.fill || 'none'}
          stroke={props?.fill || getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,6.54,6.54,0"
          transform="translate(564.57 260.73)"
          fill={props?.fill || 'none'}
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M2.46,1.23A1.23,1.23,0,1,1,1.23,0,1.23,1.23,0,0,1,2.46,1.23Z"
          transform="translate(563.75 259.91)"
          fill={props?.fill || 'none'}
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M2.46,1.23A1.23,1.23,0,1,1,1.23,0,1.23,1.23,0,0,1,2.46,1.23Z"
          transform="translate(570.29 265.63)"
          fill={props?.fill || 'none'}
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(556 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
