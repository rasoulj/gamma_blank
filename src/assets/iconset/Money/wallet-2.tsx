import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Wallet2IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="wallet-2"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="Group_20950" data-name="Group 20950">
        <Path
          id="Vector"
          d="M6,0H0"
          transform="translate(7 9)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M5.129,1.02V3.08a1.027,1.027,0,0,1-1,1.02H2.169A2.132,2.132,0,0,1,.009,2.23,2.008,2.008,0,0,1,.609.6,1.993,1.993,0,0,1,2.049,0h2.08A1.027,1.027,0,0,1,5.129,1.02Z"
          transform="translate(16.871 9.95)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M15.48,7.05a2.008,2.008,0,0,0-.6,1.63,2.132,2.132,0,0,0,2.16,1.87H19V12a4.724,4.724,0,0,1-5,5H5a4.724,4.724,0,0,1-5-5V5A4.654,4.654,0,0,1,4.19.06,5.322,5.322,0,0,1,5,0h9a4.573,4.573,0,0,1,.75.05A4.664,4.664,0,0,1,19,5V6.45H16.92A1.993,1.993,0,0,0,15.48,7.05Z"
          transform="translate(2 3.5)"
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
          transform="translate(24 24) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
