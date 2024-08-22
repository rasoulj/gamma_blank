import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {Pressable} from 'react-native';

function FUser({style = {}, onClick, ...props}) {
  return (
    <Pressable style={style} onPress={onClick}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={22.036}
        height={27.761}
        viewBox="0 0 22.036 27.761"
        width={props.size}
        height={props.size}
        {...props}>
        <G fill="none" stroke="#363853" strokeWidth={2}>
          <Path
            data-name="Path 314"
            d="M0 23.058a6.963 6.963 0 015.73-6.939l.3-.049a24.522 24.522 0 017.981 0l.3.049a6.963 6.963 0 015.73 6.939 2.661 2.661 0 01-2.616 2.7H2.616A2.661 2.661 0 010 23.058z"
            transform="translate(1 1)"
          />
          <Path
            data-name="Path 315"
            d="M15.858 5.635a5.742 5.742 0 01-5.844 5.635 5.742 5.742 0 01-5.839-5.635A5.742 5.742 0 0110.019 0a5.742 5.742 0 015.839 5.635z"
            transform="translate(1 1)"
          />
        </G>
      </Svg>
    </Pressable>
  );
}

export default FUser;
