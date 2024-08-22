import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BatteryFullIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="battery-full"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="battery-full-2"
        data-name="battery-full"
        transform="translate(-364 -188)"
      >
        <Path
          id="Vector"
          d="M0,0C1.5,0,1.5.5,1.5,1.5v2C1.5,4.5,1.5,5,0,5"
          transform="translate(384.5 197.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0A8.2,8.2,0,0,1,0,4"
          transform="translate(370.38 198)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0A8.2,8.2,0,0,1,0,4"
          transform="translate(373.88 198)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0A8.2,8.2,0,0,1,0,4"
          transform="translate(377.38 198)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M11,14H5c-4,0-5-1-5-5V5C0,1,1,0,5,0h6c4,0,5,1,5,5V9C16,13,15,14,11,14Z"
          transform="translate(366 193)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(364 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
