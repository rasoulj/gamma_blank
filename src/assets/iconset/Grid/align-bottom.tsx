import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function AlignBottomIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="align-bottom"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="align-bottom-2"
        data-name="align-bottom"
        transform="translate(-492 -316)"
      >
        <Path
          id="Vector"
          d="M5.5,0V11.8c0,1.5-.64,2.1-2.23,2.1H2.23C.64,13.9,0,13.3,0,11.8V0"
          transform="translate(505.76 321.1)"
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
          transform="translate(492 316)"
          fill="none"
          opacity="0"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0V6.8C0,8.3.64,8.9,2.23,8.9H3.27c1.59,0,2.23-.6,2.23-2.1V0"
          transform="translate(497.26 321.1)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H20"
          transform="translate(494 321)"
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
