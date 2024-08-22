import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function CloudLightningIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="cloud-lightning"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="cloud-lightning-2"
        data-name="cloud-lightning"
        transform="translate(-748 -188)"
      >
        <Path
          id="Vector"
          d="M11.477,16.042a5.294,5.294,0,0,0,.83-10.53C10.767-3.828-2.7-.288.487,8.6"
          transform="translate(753.133 191.958)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M5.2.4A3.644,3.644,0,0,0,3.491,0a3.727,3.727,0,0,0,0,7.44"
          transform="translate(750.079 200.57)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,.41A3.839,3.839,0,0,1,1.66,0"
          transform="translate(763.82 197.48)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M.442,3.536h1v2.33a.373.373,0,0,0,.65.25l2.45-2.79c.3-.34.17-.62-.28-.62h-1V.376a.373.373,0,0,0-.65-.25L.162,2.916C-.138,3.256-.008,3.536.442,3.536Z"
          transform="translate(756.788 203.624)"
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
          transform="translate(772 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
