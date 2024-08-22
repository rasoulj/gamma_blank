import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MedalIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="medal"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="medal-2" data-name="medal" transform="translate(-108 -316)">
        <Path
          id="Vector"
          d="M13.5,6.5A6.629,6.629,0,0,1,6.75,13,6.629,6.629,0,0,1,0,6.5,6.629,6.629,0,0,1,6.75,0,6.629,6.629,0,0,1,13.5,6.5Z"
          transform="translate(113.25 318)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M.01.18,0,7.56c0,.9.63,1.34,1.41.97L4.09,7.26a1.035,1.035,0,0,1,.81,0L7.59,8.53C8.36,8.89,9,8.46,9,7.56V0"
          transform="translate(115.51 329.34)"
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
          transform="translate(108 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
