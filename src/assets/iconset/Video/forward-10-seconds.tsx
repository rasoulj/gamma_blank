import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Forward10SecondsIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="forward-10-seconds"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="forward-10-seconds-2"
        data-name="forward-10-seconds"
        transform="translate(-172 -514)"
      >
        <Path
          id="Vector"
          d="M1.98,2.47,0,0"
          transform="translate(184 516)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M15.98,3.58A8.863,8.863,0,1,1,8.89,0a8.654,8.654,0,0,1,1.98.24"
          transform="translate(175.11 518.22)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <G id="Group">
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M1.5,5.34V0L0,1.67"
            transform="translate(180.04 524.58)"
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
            transform="translate(184 524.58)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(172 514)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
