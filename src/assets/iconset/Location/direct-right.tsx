import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function DirectRightIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="direct-right"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="direct-right-2"
        data-name="direct-right"
        transform="translate(-428 -252)"
      >
        <Path
          id="Vector"
          d="M16.292,6.484,4.7.384a3.2,3.2,0,0,0-4.35,4.26l1.62,3.24a3.2,3.2,0,0,1,0,2.86l-1.62,3.24a3.2,3.2,0,0,0,4.35,4.26l11.59-6.1A3.2,3.2,0,0,0,16.292,6.484Z"
          transform="translate(430.998 254.686)"
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
          transform="translate(452 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
