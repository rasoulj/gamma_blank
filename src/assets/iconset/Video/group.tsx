import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function GroupIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="group"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="group-2" data-name="group" transform="translate(-108 -578)">
        <Path
          id="Vector"
          d="M0,11.97l2.55.01a2.714,2.714,0,0,0,2.26-1.2L11.2,1.2A2.689,2.689,0,0,1,13.46,0l4.55.02"
          transform="translate(111 584.01)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,2,2,0"
          transform="translate(127 595.98)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M5.89,2.62,4.81,1.12A2.675,2.675,0,0,0,2.61,0L0,.01"
          transform="translate(111 584)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0,1.22,1.57A2.725,2.725,0,0,0,3.37,2.62L8.04,2.6"
          transform="translate(120.97 593.38)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M2,2,0,0"
          transform="translate(127 582.02)"
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
          transform="translate(108 578)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
