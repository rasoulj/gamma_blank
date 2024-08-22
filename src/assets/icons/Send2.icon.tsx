import React from 'react';
import Svg, {Path, G} from 'react-native-svg';

function SendIcon2({...props}) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G
        data-name="send"
        fill={props.color}
        stroke="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <Path d="m9.51 4.23 8.56 4.28c3.84 1.92 3.84 5.06 0 6.98l-8.56 4.28c-5.76 2.88-8.11.52-5.23-5.23l.87-1.73a2.046 2.046 0 0 0 0-1.61l-.87-1.74C1.4 3.71 3.76 1.35 9.51 4.23Z" />
        <Path data-name="Vector" d="M5.44 12h5.4" />
      </G>
    </Svg>
  );
}

export default SendIcon2;
