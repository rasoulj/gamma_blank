import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function EyeIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="eye"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="eye-2" data-name="eye" transform="translate(-108 -188)">
        <Path
          id="Vector"
          d="M7.16,3.58A3.58,3.58,0,1,1,3.58,0,3.576,3.576,0,0,1,7.16,3.58Z"
          transform="translate(116.42 196.42)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M9.785,16.55c3.53,0,6.82-2.08,9.11-5.68a5.326,5.326,0,0,0,0-5.19C16.6,2.08,13.315,0,9.785,0S2.965,2.08.675,5.68a5.326,5.326,0,0,0,0,5.19C2.965,14.47,6.255,16.55,9.785,16.55Z"
          transform="translate(110.215 191.72)"
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
          transform="translate(132 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
