import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function DirectIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="direct"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="send-2" transform="translate(-300 -316)">
        <Path
          id="Vector"
          d="M4.283,3.2l8.49-2.83c3.81-1.27,5.88.81,4.62,4.62l-2.83,8.49c-1.9,5.71-5.02,5.71-6.92,0l-.84-2.52-2.52-.84C-1.427,8.223-1.427,5.113,4.283,3.2Z"
          transform="translate(303.117 319.117)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,3.59,3.58,0"
          transform="translate(310.11 326.06)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(300 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
