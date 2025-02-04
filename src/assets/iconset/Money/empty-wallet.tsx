import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function EmptyWalletIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="empty-wallet"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="Group_20949"
        data-name="Group 20949"
        transform="translate(-172 -188)"
      >
        <G id="Group">
          <Path
            id="Vector"
            d="M15.54,5.8a2.008,2.008,0,0,0-.6,1.63A2.132,2.132,0,0,0,17.1,9.3H19v1.19a3.768,3.768,0,0,1-3.76,3.76H3.76A3.768,3.768,0,0,1,0,10.49V3.76A3.768,3.768,0,0,1,3.76,0H15.24A3.768,3.768,0,0,1,19,3.76V5.2H16.98A1.993,1.993,0,0,0,15.54,5.8Z"
            transform="translate(174.5 195.75)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M0,10.364V5.794a2.848,2.848,0,0,1,1.84-2.67l7.94-3A1.9,1.9,0,0,1,12.35,1.9V5.7"
            transform="translate(174.5 190.046)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M5.129,1.02V3.08a1.027,1.027,0,0,1-1,1.02H2.169A2.132,2.132,0,0,1,.009,2.23,2.008,2.008,0,0,1,.609.6,1.993,1.993,0,0,1,2.049,0h2.08A1.027,1.027,0,0,1,5.129,1.02Z"
          transform="translate(189.43 200.95)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H7"
          transform="translate(179 200)"
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
          transform="translate(172 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
