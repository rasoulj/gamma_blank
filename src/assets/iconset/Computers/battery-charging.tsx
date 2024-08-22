import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BatteryChargingIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="battery-charging"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="battery-charging-2"
        data-name="battery-charging"
        transform="translate(-428 -188)"
      >
        <Path
          id="Vector"
          d="M0,0C1.5,0,1.5.5,1.5,1.5v2C1.5,4.5,1.5,5,0,5"
          transform="translate(448.5 197.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M2.029,0,.139,2.5A1,1,0,0,0,1,4H3.3a1,1,0,0,1,.87,1.5L2.029,8"
          transform="translate(435.971 196)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M5,14c-4,0-5-1-5-5V5C0,1,1,0,5,0"
          transform="translate(430 193)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0C4,0,5,1,5,5V9c0,4-1,5-5,5"
          transform="translate(441 193)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(428 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
