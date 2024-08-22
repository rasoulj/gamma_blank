import * as React from "react";
import Svg, { G, Rect, Text, TSpan, Path } from "react-native-svg";
import { getColor } from "~/components";

function Twitter3Icon(props: any) {
  return (
    <Svg
      width={props?.width || "24"}
      height={props?.height || "24"}
      viewBox="0 0 25 24"
      fill="none"
    >
      <Path
        d="M19.4014 0H23.0816L15.0415 10.1662L24.5 24H17.0941L11.2935 15.6098L4.65631 24H0.973926L9.57356 13.1262L0.5 0H8.09394L13.3372 7.66892L19.4014 0ZM18.1098 21.5631H20.149L6.98589 2.30892H4.79759L18.1098 21.5631Z"
        fill={getColor({ color: "primary.500" })}
      />
    </Svg>
  );
}

export default Twitter3Icon;
