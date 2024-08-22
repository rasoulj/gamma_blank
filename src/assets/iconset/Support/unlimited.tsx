import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function UnlimitedIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="unlimited"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="unlimited-2"
        data-name="unlimited"
        transform="translate(-172 -316)"
      >
        <Path
          id="Vector"
          d="M8.19,1.87A4.474,4.474,0,0,0,4.55,0a4.55,4.55,0,1,0,0,9.1A4.821,4.821,0,0,0,8.68,6.76l1.33-2.21,1.32-2.21A4.821,4.821,0,0,1,15.46,0a4.55,4.55,0,0,1,0,9.1,4.5,4.5,0,0,1-3.64-1.87"
          transform="translate(173.99 323.45)"
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
          transform="translate(196 340) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
