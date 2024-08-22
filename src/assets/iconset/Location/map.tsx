import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MapIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="map"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="map-2" data-name="map" transform="translate(-684 -252)">
        <Path
          id="Vector"
          d="M0,4.442v9.73c0,1.9,1.35,2.68,2.99,1.74l2.35-1.34a2.232,2.232,0,0,1,1.89-.05l5.25,2.63a2.268,2.268,0,0,0,1.89-.05l4.33-2.48a2.24,2.24,0,0,0,1.01-1.74V3.152c0-1.9-1.35-2.68-2.99-1.74l-2.35,1.34a2.232,2.232,0,0,1-1.89.05L7.23.182a2.268,2.268,0,0,0-1.89.05L1.01,2.712A2.21,2.21,0,0,0,0,4.442Z"
          transform="translate(686.29 255.338)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0V13"
          transform="translate(692.56 256)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0V13.38"
          transform="translate(699.73 258.62)"
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
          transform="translate(708 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
