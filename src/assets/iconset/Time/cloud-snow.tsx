import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function CloudSnowIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="cloud-snow"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="cloud-snow-2"
        data-name="cloud-snow"
        transform="translate(-684 -188)"
      >
        <Path
          id="Vector"
          d="M11.477,16.042a5.294,5.294,0,0,0,.83-10.53C10.767-3.828-2.7-.288.487,8.6"
          transform="translate(689.133 191.958)"
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
          transform="translate(686.079 200.57)"
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
          transform="translate(699.82 197.48)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M.5.5H.5"
          transform="translate(696.5 206)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M.5.5H.5"
          transform="translate(692.5 206)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M.5.5H.5"
          transform="translate(694.5 209)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(708 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
