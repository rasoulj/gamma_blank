import * as React from 'react';
import theme from '~/theme';
import {getColor} from '~/utils/helper/theme.methods';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

export default function TrashIconSet(props: SvgProps) {
  const color =
    getColor({color: props.color, theme}) ||
    theme?.components?.Icon?.color?.default ||
    '#292d32';

  return (
    <Svg
      id="trash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G id="trash-2" data-name="trash" transform="translate(-108 -188)">
        <Path
          id="Vector"
          d="M18,.5C14.67.17,11.32,0,7.98,0A59.068,59.068,0,0,0,2.04.3L0,.5"
          transform="translate(111 193.48)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,2.97.22,1.66C.38.71.5,0,2.19,0H4.81C6.5,0,6.63.75,6.78,1.67L7,2.97"
          transform="translate(116.5 190)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M13.7,0l-.65,10.07c-.11,1.57-.2,2.79-2.99,2.79H3.64C.85,12.86.76,11.64.65,10.07L0,0"
          transform="translate(113.15 197.14)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H3.33"
          transform="translate(118.33 204.5)"
          fill="none"
          stroke={getColor({theme, color})}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H5"
          transform="translate(117.5 200.5)"
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
          transform="translate(108 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
