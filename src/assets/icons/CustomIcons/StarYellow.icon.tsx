import * as React from "react";
import Svg, { Path } from "react-native-svg";

function StarGoldIcon(props) {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.959 6.629a.848.848 0 00-.732-.585l-4.618-.42L8.783 1.35a.85.85 0 00-1.564 0L5.393 5.625l-4.62.418a.851.851 0 00-.481 1.489l3.49 3.06-1.03 4.535a.849.849 0 001.266.919L8 13.665l3.982 2.378a.85.85 0 001.265-.92l-1.03-4.53 3.492-3.06a.85.85 0 00.249-.9v-.004z"
        fill="#FFC107"
      />
    </Svg>
  );
}

export default StarGoldIcon;
