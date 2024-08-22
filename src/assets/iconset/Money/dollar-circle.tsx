import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function DollarCircleIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="dollar-circle"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="dollar-circle-2"
        data-name="dollar-circle"
        transform="translate(-236 -572)"
      >
        <Path
          id="Vector"
          d="M0,6.99A2.272,2.272,0,0,0,2.22,9.32H4.73A1.988,1.988,0,0,0,6.67,7.29,1.75,1.75,0,0,0,5.35,5.36L1.32,3.96A1.75,1.75,0,0,1,0,2.03,1.988,1.988,0,0,1,1.94,0H4.45A2.272,2.272,0,0,1,6.67,2.33"
          transform="translate(244.672 579.34)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0V12"
          transform="translate(248 578)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M20,10A10,10,0,1,1,10,0,10,10,0,0,1,20,10Z"
          transform="translate(238 574)"
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
          transform="translate(236 572)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
