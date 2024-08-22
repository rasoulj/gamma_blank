import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function AlignTopIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="align_top"
      data-name="align top"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="frame" transform="translate(-556 -316)">
        <Path
          id="Vector"
          d="M5.5,13.9V2.1C5.5.6,4.86,0,3.27,0H2.23C.64,0,0,.6,0,2.1V13.9"
          transform="translate(569.76 321)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,8.9V2.1C0,.6.64,0,2.23,0H3.27C4.86,0,5.5.6,5.5,2.1V8.9"
          transform="translate(561.26 326)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H20"
          transform="translate(558 335)"
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
          transform="translate(556 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
