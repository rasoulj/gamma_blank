import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ShopIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="shop"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="shop-2" data-name="shop" transform="translate(-172 -252)">
        <Path
          id="Vector"
          d="M0,0V4.49c0,4.49,1.8,6.29,6.29,6.29h5.39c4.49,0,6.29-1.8,6.29-6.29V0"
          transform="translate(175.01 263.22)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M3.016,10a2.965,2.965,0,0,0,3-3.32L5.356,0H.686L.016,6.68A2.965,2.965,0,0,0,3.016,10Z"
          transform="translate(180.984 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M4.01,10a3.257,3.257,0,0,0,3.3-3.65L7.03,3.6C6.67,1,5.67,0,3.05,0H0L.7,7.01A3.408,3.408,0,0,0,4.01,10Z"
          transform="translate(186.3 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M3.318,10a3.39,3.39,0,0,0,3.3-2.99l.22-2.21L7.318,0H4.268C1.648,0,.648,1,.288,3.6L.018,6.35A3.257,3.257,0,0,0,3.318,10Z"
          transform="translate(174.322 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M2.5,0A2.207,2.207,0,0,0,0,2.5V5H5V2.5A2.207,2.207,0,0,0,2.5,0Z"
          transform="translate(181.5 269)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(172 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
