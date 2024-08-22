import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function DirectLeftIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="direct-left"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="direct-left-2"
        data-name="direct-left"
        transform="translate(-364 -252)"
      >
        <Path
          id="Vector"
          d="M1.71,6.484,13.3.384a3.2,3.2,0,0,1,4.35,4.26l-1.62,3.24a3.2,3.2,0,0,0,0,2.86l1.62,3.24a3.2,3.2,0,0,1-4.35,4.26l-11.59-6.1A3.2,3.2,0,0,1,1.71,6.484Z"
          transform="translate(367 254.686)"
          fill="none"
          stroke={getColor({ theme, color })}
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
