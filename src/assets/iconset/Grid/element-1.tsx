import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Element1IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="element-1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="element-1-2"
        data-name="element-1"
        transform="translate(-492 -252)"
      >
        <Path
          id="Vector"
          d="M8.5,17.9V2.1C8.5.6,7.86,0,6.27,0H2.23C.64,0,0,.6,0,2.1V17.9C0,19.4.64,20,2.23,20H6.27C7.86,20,8.5,19.4,8.5,17.9Z"
          transform="translate(494 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.5,8.9V2.1C8.5.6,7.86,0,6.27,0H2.23C.64,0,0,.6,0,2.1V8.9C0,10.4.64,11,2.23,11H6.27C7.86,11,8.5,10.4,8.5,8.9Z"
          transform="translate(505.5 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M8.5,3.9V2.1C8.5.6,7.86,0,6.27,0H2.23C.64,0,0,.6,0,2.1V3.9C0,5.4.64,6,2.23,6H6.27C7.86,6,8.5,5.4,8.5,3.9Z"
          transform="translate(505.5 268)"
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
          transform="translate(492 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
