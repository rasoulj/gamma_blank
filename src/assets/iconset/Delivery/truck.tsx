import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function TruckIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="truck"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="group" transform="translate(-684 -188)">
        <Path
          id="Vector"
          d="M13,0V10a2.006,2.006,0,0,1-2,2H0V4A4,4,0,0,1,4,0Z"
          transform="translate(686 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M20,9v3a3,3,0,0,1-3,3H16a2,2,0,0,0-4,0H8a2,2,0,0,0-4,0H3a3,3,0,0,1-3-3V9H11a2.006,2.006,0,0,0,2-2V0h1.84a2.016,2.016,0,0,1,1.74,1.01L18.29,4H17a1,1,0,0,0-1,1V8a1,1,0,0,0,1,1Z"
          transform="translate(686 193)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M4,2A2,2,0,1,1,2,0,2,2,0,0,1,4,2Z"
          transform="translate(690 206)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M4,2A2,2,0,1,1,2,0,2,2,0,0,1,4,2Z"
          transform="translate(698 206)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M4,3V5H1A1,1,0,0,1,0,4V1A1,1,0,0,1,1,0H2.29Z"
          transform="translate(702 197)"
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
          transform="translate(684 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
