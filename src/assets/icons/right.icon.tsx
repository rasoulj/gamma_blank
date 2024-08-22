import React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";
import { SVGAttributes } from "react";
import { getColor } from "~/components/elemental/helper";
import theme from "~/theme";
import { isDark } from "~/components/elemental";

export default function RightIcon(props: SVGAttributes<SVGElement>) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default;

  return (
    <Svg
      id="arrow-right"
      xmlns="http://www.w3.org/2000/Svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        id="arrow-right-2"
        data-name="arrow-right"
        transform="translate(-300 -252)"
      >
        <Path
          id="Vector"
          d="M0,15.84,6.52,9.32a1.986,1.986,0,0,0,0-2.8L0,0"
          transform="translate(308.91 256.08)"
          fill="none"
          stroke={getColor({ color: color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(324 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
