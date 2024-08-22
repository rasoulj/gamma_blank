import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MoonIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="moon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="moon-2" data-name="moon" transform="translate(-108 -188)">
        <Path
          id="Vector"
          d="M.027,10.425a10.506,10.506,0,0,0,18.93,5.3c.82-1.11.38-1.85-.99-1.6a9.494,9.494,0,0,1-2.08.14,9.324,9.324,0,0,1-8.91-9.12,8.9,8.9,0,0,1,.75-3.65c.54-1.24-.11-1.83-1.36-1.3A10.3,10.3,0,0,0,.027,10.425Z"
          transform="translate(110.003 189.995)"
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
          transform="translate(132 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
