import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Element4IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="element-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="element-4-2"
        data-name="element-4"
        transform="translate(-684 -252)"
      >
        <Path
          id="Vector"
          d="M8.5,8.9V2.1C8.5.6,7.86,0,6.27,0H2.23C.64,0,0,.6,0,2.1V8.9C0,10.4.64,11,2.23,11H6.27C7.86,11,8.5,10.4,8.5,8.9Z"
          transform="translate(697.5 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.5,3.9V2.1C8.5.6,7.86,0,6.27,0H2.23C.64,0,0,.6,0,2.1V3.9C0,5.4.64,6,2.23,6H6.27C7.86,6,8.5,5.4,8.5,3.9Z"
          transform="translate(697.5 268)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M8.5,2.1V8.9c0,1.5-.64,2.1-2.23,2.1H2.23C.64,11,0,10.4,0,8.9V2.1C0,.6.64,0,2.23,0H6.27C7.86,0,8.5.6,8.5,2.1Z"
          transform="translate(686 263)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M8.5,2.1V3.9C8.5,5.4,7.86,6,6.27,6H2.23C.64,6,0,5.4,0,3.9V2.1C0,.6.64,0,2.23,0H6.27C7.86,0,8.5.6,8.5,2.1Z"
          transform="translate(686 254)"
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
          transform="translate(684 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
