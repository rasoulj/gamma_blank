import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function NextIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="next"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="next-2" data-name="next" transform="translate(-236 -450)">
        <G id="Group">
          <Path
            id="Vector"
            d="M0,2.556v9.57a2.556,2.556,0,0,0,3.83,2.21l4.15-2.39,4.15-2.4a2.544,2.544,0,0,0,0-4.41l-4.15-2.4L3.83.346A2.553,2.553,0,0,0,0,2.556Z"
            transform="translate(239.76 454.664)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M0,12.36V0"
            transform="translate(256.24 455.82)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(260 474) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
