import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function LockIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={11}
      height={16}
      viewBox="0 0 11 16"
      {...props}>
      <Path
        data-name="Icon Lock"
        d="M10 16H1a.987.987 0 01-1-.97V7.273A.987.987 0 011 6.3h.5V3.879A3.945 3.945 0 015.5 0a3.946 3.946 0 014 3.879V6.3h.5a.987.987 0 011 .97v7.76a.987.987 0 01-1 .97zM5.5 8.436A1.48 1.48 0 004 9.891a1.459 1.459 0 001 1.365v2.707h1v-2.707a1.459 1.459 0 001-1.365 1.48 1.48 0 00-1.5-1.455zm0-7.467a2.959 2.959 0 00-3 2.91V6.3h6V3.879a2.959 2.959 0 00-3-2.91z"
        fill="#fff"
      />
    </Svg>
  );
}
