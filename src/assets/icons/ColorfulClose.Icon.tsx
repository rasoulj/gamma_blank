import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ColorfulClose(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={50}
      viewBox="0 0 21.547 21.547"
      {...props}>
      <Path
        d="M6.093 6.094l9.36 9.359m0-9.36l-9.36 9.36"
        fill="none"
        stroke="#1de9b6"
        strokeLinecap="round"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default ColorfulClose;
