import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function TradeIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="trade"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="trade-2" data-name="trade" transform="translate(-174 -188)">
        <Path
          id="Vector"
          d="M13,6.5A6.5,6.5,0,0,1,6.5,13c-.17,0-.35-.01-.52-.02A6.509,6.509,0,0,0,.02,7.02C.01,6.85,0,6.67,0,6.5a6.5,6.5,0,0,1,13,0Z"
          transform="translate(183 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M13,6.5A6.5,6.5,0,1,1,6.5,0c.17,0,.35.01.52.02a6.509,6.509,0,0,1,5.96,5.96C12.99,6.15,13,6.33,13,6.5Z"
          transform="translate(176 197)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3.59,0H1A1,1,0,0,0,0,1V3.59a1,1,0,0,0,1.71.71L4.3,1.71A1,1,0,0,0,3.59,0Z"
          transform="translate(176 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M1,4.594H3.59a1,1,0,0,0,1-1V1A1,1,0,0,0,2.88.294L.29,2.884A1,1,0,0,0,1,4.594Z"
          transform="translate(191.41 205.406)"
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
          transform="translate(174 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
