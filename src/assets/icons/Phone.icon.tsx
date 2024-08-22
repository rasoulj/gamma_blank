import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PhoneIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}>
      <Path
        data-name="Path 29610"
        d="M18.12 14a10.172 10.172 0 01-3.138-.5.869.869 0 00-.9.213l-1.4 1.751A13.5 13.5 0 016.564 9.4L8.3 7.924a.907.907 0 00.213-.907 9.913 9.913 0 01-.5-3.138.888.888 0 00-.88-.879H4.058C3.578 3 3 3.213 3 3.88A15.246 15.246 0 0018.12 19a.933.933 0 00.88-1.049v-3.067a.888.888 0 00-.88-.88z"
        transform="translate(2 2) translate(-3 -3)"
        fill="#1de9b6"
      />
      <Path fill="none" d="M0 0H20V20H0z" />
    </Svg>
  );
}

export default PhoneIcon;
