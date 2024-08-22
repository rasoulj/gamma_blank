import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ChartSquareIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="chart-square"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="Group" transform="translate(-748 -252)">
        <Path
          id="Vector"
          d="M3.79,0H1.14A1.139,1.139,0,0,0,0,1.14V6.26H3.79V0Z"
          transform="translate(754.32 263.15)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M2.66,0H1.14A1.139,1.139,0,0,0,0,1.14V10.8H3.79V1.14A1.131,1.131,0,0,0,2.66,0Z"
          transform="translate(758.101 258.6)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M2.65,0H0V4.55H3.79V1.14A1.153,1.153,0,0,0,2.65,0Z"
          transform="translate(761.898 264.85)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </G>
      <Path
        id="Vector-4"
        data-name="Vector"
        d="M7,20h6c5,0,7-2,7-7V7c0-5-2-7-7-7H7C2,0,0,2,0,7v6C0,18,2,20,7,20Z"
        transform="translate(2 2)"
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
    </Svg>
  );
}
