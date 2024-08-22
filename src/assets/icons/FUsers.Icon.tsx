import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {Pressable} from 'react-native';

function FUsers({style = {}, onClick, ...props}) {
  return (
    <Pressable style={style} onPress={onClick}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={28.365}
        height={25.435}
        viewBox="0 0 28.365 25.435"
        width={props.size}
        height={props.size}
        {...props}>
        <G fill="none" stroke="#363853" strokeWidth={2}>
          <Path
            data-name="Path 311"
            d="M0 21.136a5.967 5.967 0 015.027-5.893l.261-.042a22.209 22.209 0 017 0l.261.042a5.968 5.968 0 015.027 5.893 2.3 2.3 0 01-2.3 2.3H2.3a2.3 2.3 0 01-2.3-2.3z"
            transform="translate(1 1)"
          />
          <Path
            data-name="Path 312"
            d="M13.915 5.126A5.126 5.126 0 118.788 0a5.126 5.126 0 015.127 5.126z"
            transform="translate(1 1)"
          />
          <Path
            data-name="Path 313"
            d="M17.576 10.253a5.126 5.126 0 000-10.253m3.5 23.435h2.993a2.3 2.3 0 002.3-2.3 5.968 5.968 0 00-5.027-5.893h0a3.341 3.341 0 00-.525-.042h-1.423"
            strokeLinecap="round"
            transform="translate(1 1)"
          />
        </G>
      </Svg>
    </Pressable>
  );
}

export default FUsers;
