import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function PreviousIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="previous"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="previous-2" data-name="previous" transform="translate(-172 -450)">
        <G id="Group">
          <Path
            id="Vector"
            d="M13.405,2.556v9.57a2.556,2.556,0,0,1-3.83,2.21l-4.15-2.39-4.15-2.4a2.544,2.544,0,0,1,0-4.41l4.15-2.4L9.575.346A2.553,2.553,0,0,1,13.405,2.556Z"
            transform="translate(178.835 454.664)"
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
            transform="translate(175.76 455.82)"
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
          transform="translate(196 474) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
