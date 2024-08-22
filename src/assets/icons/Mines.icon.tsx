import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MinesIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={6}
      viewBox="0 0 18 6"
      {...props}>
      <Path fill="none" d="M0 0H18V6H0z" />
      <Path
        data-name="Path 29656"
        d="M19 13H5v-2h14z"
        transform="translate(1.734 2) translate(-5 -11)"
        fill="#fc6550"
      />
    </Svg>
  );
}

export default MinesIcon;
