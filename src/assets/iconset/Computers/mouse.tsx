import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MouseIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="mouse"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="mouse-2" data-name="mouse" transform="translate(-364 -316)">
        <Path
          id="Vector"
          d="M7.5,20A7.516,7.516,0,0,0,15,12.5v-5a7.5,7.5,0,0,0-15,0v5A7.516,7.516,0,0,0,7.5,20Z"
          transform="translate(368.5 318)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M1.5,5A1.5,1.5,0,0,1,0,3.5v-2a1.5,1.5,0,0,1,3,0v2A1.5,1.5,0,0,1,1.5,5Z"
          transform="translate(374.5 322)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,4V0"
          transform="translate(376 318)"
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
