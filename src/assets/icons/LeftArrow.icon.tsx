import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function LeftArrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26.597}
      height={20.044}
      viewBox="0 0 26.597 20.044"
      {...props}>
      <G
        fill="none"
        stroke="#8f8f8f"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}>
        <Path
          data-name="Path 1020"
          d="M16.136 17.922l8.961-8.961L16.136 0"
          transform="rotate(180 12.924 9.492)"
        />
        <Path
          data-name="Path 1021"
          d="M0 8.961h24.846"
          transform="rotate(180 12.924 9.492)"
        />
      </G>
    </Svg>
  );
}

export default LeftArrow;
