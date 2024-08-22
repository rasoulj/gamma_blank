import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ShieldTickIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="shield-tick"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="shield-tick-2"
        data-name="shield-tick"
        transform="translate(-300 -188)"
      >
        <Path
          id="Vector"
          d="M7.08.233,2.09,2.113A3.47,3.47,0,0,0,0,5.122v7.43a4.862,4.862,0,0,0,1.73,3.44l4.3,3.21a4.552,4.552,0,0,0,5.14,0l4.3-3.21a4.862,4.862,0,0,0,1.73-3.44V5.122A3.472,3.472,0,0,0,15.11,2.1L10.12.233A5.085,5.085,0,0,0,7.08.233Z"
          transform="translate(303.41 189.997)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,2.69,1.61,4.3,5.91,0"
          transform="translate(309.05 197.18)"
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
          transform="translate(324 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
