import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Pressable} from 'react-native';

function FHome({style = {}, onClick, ...props}) {
  return (
    <Pressable style={style} onPress={onClick}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={27.73}
        height={27.497}
        viewBox="0 0 27.73 27.497"
        width={props.size}
        height={props.size}
        {...props}>
        <Path
          d="M26.319 13.437a.991.991 0 000-1.4l-8.112-8.165a24.011 24.011 0 00-2.146-2.012 3.549 3.549 0 00-2.2-.86 3.549 3.549 0 00-2.2.86 24.017 24.017 0 00-2.142 2.012l-8.113 8.17a.991.991 0 000 1.4.976.976 0 001.387 0l.562-.565v4.32a9.12 9.12 0 007 8.891 15.271 15.271 0 007.019 0 9.12 9.12 0 007-8.891v-4.32l.562.565a.976.976 0 001.383-.005z"
          fill="none"
          stroke="#333"
          strokeWidth={2}
        />
      </Svg>
    </Pressable>
  );
}

export default FHome;
