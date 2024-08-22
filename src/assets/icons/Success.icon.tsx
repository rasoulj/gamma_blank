import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { getColor } from "~/components/elemental";
import theme from "~/theme";
function Success2Icon(props) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#39DA2C";
  return (
    <Svg
      width={props?.width ?? 57}
      height={props?.height ?? 42}
      viewBox="0 0 57 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.25 19.891L21.887 37.64 52.75 4.36"
        stroke={getColor({ theme, color })}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Success2Icon;
