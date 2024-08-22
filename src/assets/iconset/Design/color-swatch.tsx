import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ColorSwatchIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="color-swatch"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="color-swatch-2"
        data-name="color-swatch"
        transform="translate(-300 -316)"
      >
        <Path
          id="Vector"
          d="M8,2.5V16a4.007,4.007,0,0,1-1.14,2.79l-.04.04a3.149,3.149,0,0,1-.28.25,3.5,3.5,0,0,1-.99.6c-.11.05-.22.09-.33.13A3.888,3.888,0,0,1,4,20a4.255,4.255,0,0,1-.8-.08c-.13-.03-.26-.06-.39-.1a3.611,3.611,0,0,1-.46-.17c0-.01,0-.01-.01,0a5.042,5.042,0,0,1-.8-.49l-.01-.01a2.744,2.744,0,0,1-.36-.32c-.11-.12-.22-.24-.33-.37a5.042,5.042,0,0,1-.49-.8c.01-.01.01-.01,0-.01a.031.031,0,0,0-.01-.02c-.06-.14-.11-.29-.16-.44-.04-.13-.07-.26-.1-.39A4.255,4.255,0,0,1,0,16V2.5A2.362,2.362,0,0,1,2.5,0h3A2.362,2.362,0,0,1,8,2.5Z"
          transform="translate(302 318)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M16,2.5v3A2.362,2.362,0,0,1,13.5,8H0a3.888,3.888,0,0,0,1.22-.19c.11-.04.22-.08.33-.13a3.5,3.5,0,0,0,.99-.6,3.149,3.149,0,0,0,.28-.25l.04-.04L9.66,0H13.5A2.362,2.362,0,0,1,16,2.5Z"
          transform="translate(306 330)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M2.63,2.63A3.835,3.835,0,0,1,.99,1.64,3.835,3.835,0,0,1,0,0,4.02,4.02,0,0,0,2.63,2.63Z"
          transform="translate(302.18 335.19)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M9.51,6.455,6.8,9.165,0,15.955a4.007,4.007,0,0,0,1.14-2.79V3.5L3.85.795a2.368,2.368,0,0,1,3.54,0l2.12,2.12A2.368,2.368,0,0,1,9.51,6.455Z"
          transform="translate(308.86 320.835)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M2,1A1,1,0,1,1,1,0,1,1,0,0,1,2,1Z"
          transform="translate(305 333)"
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
          transform="translate(300 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
