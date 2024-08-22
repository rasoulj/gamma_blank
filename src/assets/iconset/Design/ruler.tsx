import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function RulerIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="ruler"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="ruler-2" data-name="ruler">
        <Path
          id="Vector"
          d="M3,10H17a2.652,2.652,0,0,0,3-3V3a2.652,2.652,0,0,0-3-3H3A2.652,2.652,0,0,0,0,3V7A2.652,2.652,0,0,0,3,10Z"
          transform="translate(2 7)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0V5"
          transform="translate(18 7)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0V4"
          transform="translate(6 7)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M.05,0,0,5"
          transform="translate(10 7)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0V3"
          transform="translate(14 7)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
