import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function AlignRightIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="align-right"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="align-right-2"
        data-name="align-right"
        transform="translate(-428 -316)"
      >
        <Path
          id="Vector"
          d="M13.9,5.5H2.1C.6,5.5,0,4.86,0,3.27V2.23C0,.64.6,0,2.1,0H13.9"
          transform="translate(433 329.75)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.9,0H2.1C.6,0,0,.64,0,2.23V3.27C0,4.86.6,5.5,2.1,5.5H8.9"
          transform="translate(438 321.25)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0V20"
          transform="translate(447 317.99)"
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
          transform="translate(428 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
