import * as React from "react";
import Svg, { G, Rect, Text, TSpan, Path } from "react-native-svg";
import { getColor } from "~/components";

function FaceBook3Icon(props: any) {
  return (
    <Svg
      width={props?.width || "24"}
      height={props?.height || "24"}
      viewBox="0 0 11 21"
      fill="none"
    >
      <Path
        d="M6.90472 20.667V11.5504H9.96359L10.4225 7.99485H6.90472V5.72709C6.90472 4.69821 7.18917 3.9971 8.66582 3.9971H10.5458V0.817123C9.63564 0.721691 8.72099 0.675328 7.80583 0.678235C7.18306 0.633019 6.55794 0.724543 5.97428 0.946393C5.39061 1.16824 4.86252 1.51505 4.42702 1.96251C3.99152 2.40998 3.65915 2.94726 3.45319 3.53673C3.24724 4.12619 3.17268 4.75356 3.23475 5.37487V7.99597H0.166992V11.5515H3.23586V20.667H6.90472Z"
        fill={getColor({ color: "primary.500" })}
      />
    </Svg>
  );
}

export default FaceBook3Icon;
