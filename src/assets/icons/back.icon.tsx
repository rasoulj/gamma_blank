import React from "react";
import Svg, { Path, G } from "react-native-svg";
import { getColor } from "~/components/elemental/helper";
import theme, { getTextColor } from "~/theme";

export default function BackIcon(props) {
  const color = getColor({
    color:
      props.color ||
      getTextColor(getColor({ color: "background.500" })) ||
      theme?.components?.Icon?.color?.default,
  });

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <G id="arrow-left" transform="translate(-364 -252)">
        <Path
          id="Vector"
          d="M7.1,15.84.577,9.32c-.77-.77,0-2.8,0-2.8L7.1,0"
          transform="translate(371.902 256.08)"
          fill="none"
          stroke={getColor({ color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(388 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
