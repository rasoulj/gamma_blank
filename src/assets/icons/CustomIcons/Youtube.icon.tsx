import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function YoutubeIcon(props) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={14} cy={14} r={14} fill="#0A8080" />
      <Path d="M12.14 16.164l3.72-2.159-3.72-2.17v4.33z" fill="#fff" />
      <Path
        d="M14 1.12a12.88 12.88 0 100 25.76 12.88 12.88 0 000-25.76zm6.779 15.16a2.562 2.562 0 01-2.564 2.565h-8.43a2.564 2.564 0 01-2.564-2.566v-4.558a2.564 2.564 0 012.564-2.566h8.43a2.564 2.564 0 012.564 2.566v4.558z"
        fill="#fff"
      />
    </Svg>
  );
}

export default YoutubeIcon;
