import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, Path } from "react-native-svg";

export default function ReceiptItemIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="receipt-item"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <Path
        id="Vector"
        d="M6,4V6.42A2.4,2.4,0,0,1,3.42,9H0V2.01A2.019,2.019,0,0,1,2.02,0,3.995,3.995,0,0,1,6,4Z"
        transform="translate(16 2)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        id="Vector-2"
        data-name="Vector"
        d="M0,5V19a1,1,0,0,0,1.6.8l1.71-1.28a1.007,1.007,0,0,1,1.32.1l1.66,1.67a1.008,1.008,0,0,0,1.42,0l1.68-1.68a.991.991,0,0,1,1.3-.09L12.4,19.8A1,1,0,0,0,14,19V2a2.006,2.006,0,0,1,2-2H4C1,0,0,1.79,0,4Z"
        transform="translate(2 2)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        id="Vector-3"
        data-name="Vector"
        d="M0,0H3"
        transform="translate(9 13.01)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        id="Vector-4"
        data-name="Vector"
        d="M0,0H3"
        transform="translate(9 9.01)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        id="Vector-5"
        data-name="Vector"
        d="M0,0H24V24H0Z"
        fill="none"
        opacity="0"
      />
      <Path
        id="Vector-6"
        data-name="Vector"
        d="M0,0H.009"
        transform="translate(5.996 13)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Path
        id="Vector-7"
        data-name="Vector"
        d="M0,0H.009"
        transform="translate(5.996 9)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}
