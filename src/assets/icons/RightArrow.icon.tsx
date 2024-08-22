import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function RightArrow(props) {
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
          d="M16.136 0l8.961 8.961-8.961 8.961"
          transform="translate(.75 1.061)"
        />
        <Path
          data-name="Path 1021"
          d="M0 8.962h24.846"
          transform="translate(.75 1.061)"
        />
      </G>
    </Svg>
  );
}

export default RightArrow;
