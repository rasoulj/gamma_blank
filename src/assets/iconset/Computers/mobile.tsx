import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MobileIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="mobile"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="mobile-2" data-name="mobile" transform="translate(-108 -380)">
        <Path
          id="Vector"
          d="M16,5V15c0,4-1,5-5,5H5c-4,0-5-1-5-5V5C0,1,1,0,5,0h6C15,0,16,1,16,5Z"
          transform="translate(112 382)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M4,0H0"
          transform="translate(118 385.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3.1,1.55A1.55,1.55,0,1,1,1.55,0,1.55,1.55,0,0,1,3.1,1.55Z"
          transform="translate(118.45 396)"
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
          transform="translate(132 404) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
