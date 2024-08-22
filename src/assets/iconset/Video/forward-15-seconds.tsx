import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Forward15SecondsIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="forward-15-seconds"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="forward-15-seconds-2"
        data-name="forward-15-seconds"
        transform="translate(-236 -514)"
      >
        <G id="Group">
          <Path
            id="Vector"
            d="M3.82,0H.76L0,2.29H2.29a1.53,1.53,0,1,1,0,3.06H0"
            transform="translate(248.14 524.83)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M1.5,5.34V0L0,1.67"
            transform="translate(244.04 524.83)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <G id="Group-2" data-name="Group">
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M1.98,2.47,0,0"
            transform="translate(248 516)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-4"
            data-name="Vector"
            d="M15.98,3.58A8.863,8.863,0,1,1,8.89,0a8.654,8.654,0,0,1,1.98.24"
            transform="translate(239.11 518.22)"
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
          transform="translate(236 514)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
