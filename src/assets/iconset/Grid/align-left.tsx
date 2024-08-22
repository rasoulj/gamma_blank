import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function AlignLeftIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="align-left"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="align-left-2"
        data-name="align-left"
        transform="translate(-364 -316)"
      >
        <Path
          id="Vector"
          d="M0,5.5H11.8c1.5,0,2.1-.64,2.1-2.23V2.23C13.9.64,13.3,0,11.8,0H0"
          transform="translate(369.1 329.75)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H6.8C8.3,0,8.9.64,8.9,2.23V3.27c0,1.59-.6,2.23-2.1,2.23H0"
          transform="translate(369.1 321.25)"
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
          transform="translate(369 317.99)"
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
          transform="translate(364 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
