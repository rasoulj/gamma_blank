import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function CoinIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="coin"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="Group_20952" data-name="Group 20952">
        <Path
          id="Vector"
          d="M13,0V3.7c0,3.12-2.91,5.65-6.5,5.65S0,6.82,0,3.7V0C0,3.12,2.91,5.35,6.5,5.35S13,3.12,13,0Z"
          transform="translate(5.5 12.65)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M13,5.65a4.7,4.7,0,0,1-.69,2.47A6.683,6.683,0,0,1,6.5,11,6.683,6.683,0,0,1,.69,8.12,4.7,4.7,0,0,1,0,5.65,5.294,5.294,0,0,1,1.9,1.66,6.973,6.973,0,0,1,6.5,0a7.018,7.018,0,0,1,4.6,1.65A5.331,5.331,0,0,1,13,5.65Z"
          transform="translate(5.5 2)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M13,5.65v5C13,13.77,10.09,16,6.5,16S0,13.77,0,10.65v-5C0,2.53,2.91,0,6.5,0a7.018,7.018,0,0,1,4.6,1.65A5.331,5.331,0,0,1,13,5.65Z"
          transform="translate(5.5 2)"
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
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
