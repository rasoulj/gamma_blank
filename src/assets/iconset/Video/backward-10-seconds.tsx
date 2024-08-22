import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Backward10SecondsIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="backward-10-seconds"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="backward-10-seconds-2"
        data-name="backward-10-seconds"
        transform="translate(-684 -450)"
      >
        <Path
          id="Vector"
          d="M1.5,5.34V0L0,1.67"
          transform="translate(692.04 460.58)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,2.47,1.98,0"
          transform="translate(694.02 452)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M1.8,3.58A8.863,8.863,0,1,0,8.89,0,8.654,8.654,0,0,0,6.91.24"
          transform="translate(687.11 454.22)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M2,0A2.006,2.006,0,0,1,4,2V3.35a2,2,0,0,1-4,0V2A2,2,0,0,1,2,0Z"
          transform="translate(696 460.58)"
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
          transform="translate(684 450)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
