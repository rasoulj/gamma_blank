import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function EosEosIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="eos-_eos_"
      data-name="eos-(eos)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="eos-_eos_2" data-name="eos-(eos)" transform="translate(-544 -213)">
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(544 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M5.619.6l-3.6,4.3c-.1.2-.2.5-.3.7l-1.7,8.6a1.643,1.643,0,0,0,.7,1.6l5.3,3a1.95,1.95,0,0,0,1.5,0l5.3-3a1.643,1.643,0,0,0,.7-1.6l-1.7-8.6a2.118,2.118,0,0,0-.3-.7L7.919.6A1.4,1.4,0,0,0,5.619.6Z"
          transform="translate(549.181 215.8)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(544 213)"
          fill="none"
          opacity="0"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M9.6,0,5.3,12.2c-.2.4-.8.4-.9,0L0,0"
          transform="translate(551.2 221.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </G>
    </Svg>
  );
}
