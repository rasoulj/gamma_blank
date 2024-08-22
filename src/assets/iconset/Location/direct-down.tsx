import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function DirectDownIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="direct-down"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="direct-down-2"
        data-name="direct-down"
        transform="translate(-300 -252)"
      >
        <Path
          id="Vector"
          d="M6.484,16.292.384,4.7A3.2,3.2,0,0,1,4.644.352l3.24,1.62a3.2,3.2,0,0,0,2.86,0l3.24-1.62a3.2,3.2,0,0,1,4.26,4.35l-6.1,11.59A3.2,3.2,0,0,1,6.484,16.292Z"
          transform="translate(302.686 254.998)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(324 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
