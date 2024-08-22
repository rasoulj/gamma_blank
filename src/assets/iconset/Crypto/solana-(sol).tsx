import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function SolanaSolIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="solana-_sol_"
      data-name="solana-(sol)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="solana-_sol_2"
        data-name="solana-(sol)"
        transform="translate(-608 -213)"
      >
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(608 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M17,0H2.5a.909.909,0,0,0-.8.4L.2,2.4A1,1,0,0,0,1,4H15.5a.909.909,0,0,0,.8-.4l1.5-2A1,1,0,0,0,17,0Z"
          transform="translate(611 216.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M1,0H15.5a.909.909,0,0,1,.8.4l1.5,2A1,1,0,0,1,17,4H2.5a.909.909,0,0,1-.8-.4L.2,1.6A1,1,0,0,1,1,0Z"
          transform="translate(611 223)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M17,0H2.5a.909.909,0,0,0-.8.4L.2,2.4A1,1,0,0,0,1,4H15.5a.909.909,0,0,0,.8-.4l1.5-2A1,1,0,0,0,17,0Z"
          transform="translate(611 229.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(608 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
