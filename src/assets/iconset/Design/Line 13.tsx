import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, Line } from "react-native-svg";

export default function Line13IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="10.928"
      height="11.668"
      viewBox="0 0 10.928 11.668"
    >
      <Line
        id="Line_13"
        data-name="Line 13"
        x2="10"
        transform="translate(2.118 2.118) rotate(48)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeWidth="3"
      />
    </Svg>
  );
}
