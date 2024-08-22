import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MessageTextIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="message-text"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="message-text-2"
        data-name="message-text"
        transform="translate(-236 -250)"
      >
        <Path
          id="Vector"
          d="M6.5,17H6c-4,0-6-1-6-6V6Q0,0,6,0h8q6,0,6,6v5q0,6-6,6h-.5a1.014,1.014,0,0,0-.8.4l-1.5,2a1.421,1.421,0,0,1-2.4,0l-1.5-2A1.13,1.13,0,0,0,6.5,17Z"
          transform="translate(238 252)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H10"
          transform="translate(243 258)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H6"
          transform="translate(243 263)"
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
          transform="translate(236 250)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
