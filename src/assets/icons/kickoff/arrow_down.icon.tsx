import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function ArrowDownIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        d="M255.92 260.95l-6.52 6.52a1.986 1.986 0 01-2.8 0l-6.52-6.52"
        fill="none"
        stroke={props?.color ?? "#292d32"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        transform="translate(-236 -252)"
        data-name="arrow-down"
      />
    </Svg>
  );
}

export default ArrowDownIcon;
