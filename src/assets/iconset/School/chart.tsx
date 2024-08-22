import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Chart1IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="chart"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="chart-2" data-name="chart" transform="translate(-556 -252)">
        <Path
          id="Vector"
          d="M0,0H20"
          transform="translate(558 274)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,2V20H4.5V2c0-1.1-.45-2-1.8-2H1.8C.45,0,0,.9,0,2Z"
          transform="translate(565.75 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,2V14H4V2C4,.9,3.6,0,2.4,0H1.6C.4,0,0,.9,0,2Z"
          transform="translate(559 260)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,2V9H4V2C4,.9,3.6,0,2.4,0H1.6C.4,0,0,.9,0,2Z"
          transform="translate(573 265)"
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
          transform="translate(556 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
