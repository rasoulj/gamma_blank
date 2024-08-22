import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BatteryDisableIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="battery-disable"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="battery-disable-2"
        data-name="battery-disable"
        transform="translate(-492 -188)"
      >
        <Path
          id="Vector"
          d="M0,0C1.5,0,1.5.5,1.5,1.5v2C1.5,4.5,1.5,5,0,5"
          transform="translate(512.5 197.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,19,12,0"
          transform="translate(496 190.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M5,0C1,0,0,1,0,5V9c0,3.4.72,4.63,3.39,4.92"
          transform="translate(494 193)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,13.92c4,0,5-1,5-5v-4C5,1.53,4.28.29,1.63,0"
          transform="translate(505 193.08)"
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
          transform="translate(492 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
