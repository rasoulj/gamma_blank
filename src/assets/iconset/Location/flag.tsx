import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function FlagIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="flag"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="flag-2" data-name="flag" transform="translate(-236 -380)">
        <Path
          id="Vector"
          d="M0,0V20"
          transform="translate(241.15 382)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H11.2c2.7,0,3.3,1.5,1.4,3.4L11.4,4.6a1.933,1.933,0,0,0,0,2.8l1.2,1.2c1.9,1.9,1.2,3.4-1.4,3.4H0"
          transform="translate(241.15 384)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(236 380)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
