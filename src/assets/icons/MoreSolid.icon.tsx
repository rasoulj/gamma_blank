import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function MoreSolidIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G fill="#0A8080">
        <Path d="M5 10a2 2 0 100 4 2 2 0 000-4zM19 10a2 2 0 100 4 2 2 0 000-4zM12 10a2 2 0 100 4 2 2 0 000-4z" />
      </G>
    </Svg>
  );
}

export default MoreSolidIcon;
