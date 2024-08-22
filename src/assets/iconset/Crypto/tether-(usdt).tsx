import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function TetherUsdtIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="tether-_usdt_"
      data-name="tether-(usdt)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="tether-_usdt_2"
        data-name="tether-(usdt)"
        transform="translate(-288 -213)"
      >
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(288 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M5.462,0h9.06A3.4,3.4,0,0,1,17.3,1.72l2.4,4.82a3.293,3.293,0,0,1-.69,3.68l-6.93,6.29a3.177,3.177,0,0,1-4.17,0L.982,10.22a3.276,3.276,0,0,1-.69-3.68l2.4-4.82A3.365,3.365,0,0,1,5.462,0Z"
          transform="translate(290.008 216.35)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,6V0"
          transform="translate(300 221.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H8"
          transform="translate(296 221.5)"
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
          transform="translate(288 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
