import * as React from "react";
import Svg, { G, Rect, Text, TSpan, Path } from "react-native-svg";
import { getColor } from "~/components";

function UnityIcon(props: any) {
  return (
    <Svg
      width={props?.width || "24"}
      height={props?.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M15.0005 9.5L11.9999 10.89M11.9999 10.89L9.00049 9.5M11.9999 10.89V17M17.5005 8L20.8899 6.44L18.6699 5.33M15.5005 3.5L11.9999 2L8.50049 3.5M5.32986 5.33L3.10986 6.44L6.50049 8M8.50049 20L11.9999 22L16.0005 20M5.32986 18.67L3.10986 17.56V10M18.6699 18.67L20.8899 17.56V10"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default UnityIcon;
