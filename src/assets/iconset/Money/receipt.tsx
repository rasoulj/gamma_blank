import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ReceiptIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="receipt"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="receipt-2" data-name="receipt" transform="translate(-300 -572)">
        <Path
          id="Vector"
          d="M3.23,17.7a1.758,1.758,0,0,1,2.79.15L7.03,19.2a1.738,1.738,0,0,0,2.93,0l1.01-1.35a1.758,1.758,0,0,1,2.79-.15c1.78,1.9,3.23,1.27,3.23-1.39V5.04C17,1.01,16.06,0,12.28,0H4.72C.94,0,0,1.01,0,5.04V16.3C0,18.97,1.46,19.59,3.23,17.7Z"
          transform="translate(303.5 574)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H8"
          transform="translate(308 579)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H6"
          transform="translate(309 583)"
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
          transform="translate(300 572)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
