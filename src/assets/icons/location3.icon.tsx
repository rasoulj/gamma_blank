import React from "react";
import Svg, { Path, G, Circle, Defs } from "react-native-svg";
import { getColor } from "~/utils/helper/theme.methods";

export default function Location3Icon(props) {
  const color = props?.color || props?.style?.color || "#006194";

  return (
    <Svg
      id="location"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <Defs />
      <G id="location">
        <Path
          d="M8.12967 5.99591C8.12967 7.10522 7.2304 8.00449 6.12109 8.00449C5.01179 8.00449 4.11252 7.10522 4.11252 5.99591C4.11251 4.8866 5.01179 3.98733 6.12109 3.98733C7.2304 3.98733 8.12967 4.8866 8.12967 5.99591Z"
          fill="none"
          fill-opacity="0"
          fill-rule="nonzero"
          opacity="1"
          stroke={getColor({ color })}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        />
        <Path
          d="M0.726099 4.82439C1.99486-0.750548 10.2546-0.744186 11.5161 4.83075C12.2559 8.10082 10.2219 10.8692 8.43867 12.5815C7.14346 13.8302 5.09234 13.8302 3.79713 12.5815C2.02031 10.8692-0.0137117 8.09446 0.726099 4.82439Z"
          fill="none"
          fill-opacity="0"
          fill-rule="nonzero"
          opacity="1"
          stroke={getColor({ color })}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        />
      </G>
    </Svg>
  );
}
