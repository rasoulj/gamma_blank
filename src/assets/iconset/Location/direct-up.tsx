import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function DirectUpIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="direct-up"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="direct-up-2"
        data-name="direct-up"
        transform="translate(-236 -252)"
      >
        <Path
          id="Vector"
          d="M6.484,1.71.384,13.3a3.2,3.2,0,0,0,4.26,4.35l3.24-1.62a3.2,3.2,0,0,1,2.86,0l3.24,1.62a3.2,3.2,0,0,0,4.26-4.35l-6.1-11.59A3.2,3.2,0,0,0,6.484,1.71Z"
          transform="translate(238.686 255)"
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
          transform="translate(260 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
