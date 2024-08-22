import React from "react";
import Svg, { Path, G, Circle, Defs } from "react-native-svg";
import { getColor } from "~/utils/helper/theme.methods";

export default function BackIcon(props) {
  const color = props?.color || props?.style?.color || "#006194";

  return (
    <Svg
      id="trash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <Defs />
      <G id="trash">
        <Path
          d="M17.0708 4.64191C14.0846 4.34598 11.0805 4.19353 8.08531 4.19353C6.30974 4.19353 4.53416 4.28321 2.75859 4.46256L0.929214 4.64191M5.86136 3.73619L6.05865 2.56144C6.20213 1.70952 6.30974 1.07283 7.82525 1.07283L10.1747 1.07283C11.6903 1.07283 11.8068 1.74539 11.9414 2.57041L12.1386 3.73619M15.1428 7.47565L14.5599 16.506C14.4612 17.9139 14.3805 19.0079 11.8786 19.0079L6.12143 19.0079C3.61948 19.0079 3.53877 17.9139 3.44013 16.506L2.85724 7.47565M7.50241 14.0758L10.4886 14.0758M6.75812 10.4887L11.2419 10.4887"
          fill="none"
          fill-opacity="0"
          fill-rule="nonzero"
          opacity="1"
          stroke={getColor({ color })}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </G>
    </Svg>
  );
}
