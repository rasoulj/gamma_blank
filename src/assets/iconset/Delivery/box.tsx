import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BoxIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="box"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="box-2" data-name="box" transform="translate(-108 -188)">
        <Path
          id="Vector"
          d="M0,0,8.83,5.11,17.6.03"
          transform="translate(111.17 195.44)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,9.07V0"
          transform="translate(120 200.54)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M7.54.481,2.2,3.441A4.719,4.719,0,0,0,0,7.171v5.65a4.719,4.719,0,0,0,2.2,3.73l5.34,2.97a4.792,4.792,0,0,0,4.15,0l5.34-2.97a4.719,4.719,0,0,0,2.2-3.73V7.171a4.719,4.719,0,0,0-2.2-3.73L11.69.471A4.758,4.758,0,0,0,7.54.481Z"
          transform="translate(110.39 189.999)"
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
          transform="translate(132 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
