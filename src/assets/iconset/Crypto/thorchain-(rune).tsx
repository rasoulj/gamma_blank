import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ThorchainRuneIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="thorchain-_rune_"
      data-name="thorchain-(rune)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="thorchain-_rune_2"
        data-name="thorchain-(rune)"
        transform="translate(-928 -213)"
      >
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(928 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M1.506,19.879l10.3-4.3a1.148,1.148,0,0,0,.4-1.8l-4.1-4.1-7.8,8.5A1.059,1.059,0,0,0,1.506,19.879Zm2.5-14.3,4.1,4.1,6.5-7.9a1.1,1.1,0,0,0-1.3-1.7l-8.9,3.7A1.16,1.16,0,0,0,4.006,5.579Z"
          transform="translate(932.594 215.021)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(928 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
