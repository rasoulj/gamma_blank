import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function GlassIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="glass"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="glass-2" data-name="glass" transform="translate(-170 -318)">
        <Path
          id="Vector"
          d="M4.26,20C.08,20-.76,17.47.6,14.39L4.85,4.74h-.3a2.374,2.374,0,0,1-1.68-.69,2.341,2.341,0,0,1-.7-1.68A2.375,2.375,0,0,1,4.54,0h7.11a2.386,2.386,0,0,1,2.31,2.95,2.464,2.464,0,0,1-2.42,1.79h-.16L15.6,14.4c1.35,3.08.47,5.6-3.67,5.6Z"
          transform="translate(173.9 320)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,.01A19.268,19.268,0,0,1,6.06.89,7.36,7.36,0,0,0,11.89,0"
          transform="translate(175.94 331.11)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(170 318)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
