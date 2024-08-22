import {SVGAttributes} from 'react';
import Svg, {G, Path} from 'react-native-svg';
import theme from '~/theme';
import React from 'react';

export default function Mobile(props: SVGAttributes<SVGElement>) {
  const color =
    props?.color ||
    props?.style?.color ||
    theme?.Icon?.color?.default ||
    '#1DE9B6';
  return (
    <Svg
      id="mobile"
      xmlns="http://www.w3.org/2000/Svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}>
      <G id="mobile-2" data-name="mobile" transform="translate(-108 -380)">
        <Path
          id="Vector"
          d="M16,5V15c0,4-1,5-5,5H5c-4,0-5-1-5-5V5C0,1,1,0,5,0h6C15,0,16,1,16,5Z"
          transform="translate(112 382)"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M4,0H0"
          transform="translate(118 385.5)"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3.1,1.55A1.55,1.55,0,1,1,1.55,0,1.55,1.55,0,0,1,3.1,1.55Z"
          transform="translate(118.45 396)"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(132 404) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
