import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function PlayIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="play"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="play-2" data-name="play" transform="translate(-492 -318)">
        <Path
          id="Vector"
          d="M0,8.523V4.963C0,.543,3.13-1.267,6.96.943l3.09,1.78L13.14,4.5c3.83,2.21,3.83,5.83,0,8.04l-3.09,1.78L6.96,16.1C3.13,18.313,0,16.5,0,12.083Z"
          transform="translate(496 321.477)"
          fill={props?.fill}
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(492 318)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
