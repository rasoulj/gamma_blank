import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function LogoutIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.87}
      height={13.738}
      viewBox="0 0 17.87 13.738"
      {...props}>
      <Path
        data-name="Path 31855"
        d="M10.125 8.468v4.6h7.728l-2.028-2.058a.559.559 0 11.795-.786l2.964 3.007a.568.568 0 01.159.391.533.533 0 01-.043.215.6.6 0 01-.116.176l-2.964 3.004a.559.559 0 11-.795-.786l2.028-2.058h-7.728v4.6a1.723 1.723 0 001.718 1.718h10.31a1.723 1.723 0 001.718-1.718V8.468a1.723 1.723 0 00-1.718-1.718h-10.31a1.723 1.723 0 00-1.718 1.718z"
        transform="translate(-6.002 -6.75)"
        fill={props.color || '#1de9b6'}
      />
      <Path
        data-name="Path 31856"
        d="M3.933 17.086a.558.558 0 100 1.117H7.5v-1.117z"
        transform="translate(-3.375 -10.771)"
        fill={props.color || '#1de9b6'}
      />
    </Svg>
  );
}
