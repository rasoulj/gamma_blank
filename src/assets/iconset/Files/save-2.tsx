import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Save2IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="save-2"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="save-2-2" data-name="save-2" transform="translate(-556 -188)">
        <Path
          id="Vector"
          d="M10.89,0H3.11A3.12,3.12,0,0,0,0,3.11V14.47c0,1.45,1.04,2.07,2.31,1.36l3.93-2.19a1.738,1.738,0,0,1,1.51,0l3.93,2.19c1.27.71,2.31.09,2.31-1.36V3.11A3.1,3.1,0,0,0,10.89,0Z"
          transform="translate(558 193.88)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M14,3.11V14.47c0,1.45-1.04,2.06-2.31,1.36L7.76,13.64a1.76,1.76,0,0,0-1.52,0L2.31,15.83c-1.27.7-2.31.09-2.31-1.36V3.11A3.12,3.12,0,0,1,3.11,0h7.78A3.12,3.12,0,0,1,14,3.11Z"
          transform="translate(558 193.88)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M14,3.11V14.47c0,1.45-1.04,2.06-2.31,1.36L8,13.77V6.99A3.12,3.12,0,0,0,4.89,3.88H0V3.11A3.12,3.12,0,0,1,3.11,0h7.78A3.12,3.12,0,0,1,14,3.11Z"
          transform="translate(564 190)"
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
          transform="translate(556 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
