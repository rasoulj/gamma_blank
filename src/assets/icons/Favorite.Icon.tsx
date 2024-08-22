import {SVGAttributes} from 'react';
import Svg, {Path} from 'react-native-svg';
import theme from '~/theme';
import React from 'react';

export default function Favorite(props: SVGAttributes<SVGElement>) {
  const color =
    props?.color ||
    props?.style?.color ||
    theme?.Icon?.color?.default ||
    '#1DE9B6';
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="10.811"
      viewBox="0 0 13 10.811"
      {...props}>
      <Path
        id="Vector"
        d="M6.372,9.75a1.421,1.421,0,0,1-.744,0C3.888,9.205,0,6.932,0,3.078A3.214,3.214,0,0,1,3.336,0,3.413,3.413,0,0,1,6,1.233,3.423,3.423,0,0,1,8.664,0,3.214,3.214,0,0,1,12,3.078C12,6.932,8.112,9.205,6.372,9.75Z"
        transform="translate(0.5 0.5)"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
      />
    </Svg>
  );
}
