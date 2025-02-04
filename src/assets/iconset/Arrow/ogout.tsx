import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function OgoutIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="ogout"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="logout" transform="translate(-748 -444)">
        <Path
          id="Vector"
          d="M0,5.07C.31,1.47,2.16,0,6.21,0h.13c4.47,0,6.26,1.79,6.26,6.26v6.52c0,4.47-1.79,6.26-6.26,6.26H6.21c-4.02,0-5.87-1.45-6.2-4.99"
          transform="translate(756.9 446.49)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M11.38,0H0"
          transform="translate(751.62 456)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3.35,0,0,3.35,3.35,6.7"
          transform="translate(750.5 452.65)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(772 468) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
