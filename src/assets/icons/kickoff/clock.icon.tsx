import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { getColor } from "~/components/elemental/helper";
import theme from "~/theme";

function ClockIcon({ color, ...props }) {
  const colorFinal = getColor({
    color:
      color ||
      props?.style?.color ||
      theme?.components?.Icon?.color?.default ||
      "#292d32",
  });
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        data-name="clock"
        fill="none"
        stroke={colorFinal}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <Path
          d="M194 200a10 10 0 11-10-10 10 10 0 0110 10z"
          transform="translate(-172 -188)"
        />
        <Path
          data-name="Vector"
          d="M187.71 203.18l-3.1-1.85a2.215 2.215 0 01-.98-1.72v-4.1"
          transform="translate(-172 -188)"
        />
      </G>
    </Svg>
  );
}

export default ClockIcon;
