import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BrushIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="brush"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="brush-2" data-name="brush" transform="translate(-234 -190)">
        <Path
          id="Vector"
          d="M15.54,1.93A33.727,33.727,0,0,1,6.91,13.58L4.94,15.16a3.588,3.588,0,0,1-.78.45,3.728,3.728,0,0,0-.04-.57,3.916,3.916,0,0,0-1.16-2.29A4.084,4.084,0,0,0,.6,11.56a4.007,4.007,0,0,0-.6-.01,2.614,2.614,0,0,1,.49-.84L2.05,8.74A33.629,33.629,0,0,1,13.7.1a1.4,1.4,0,0,1,1.52.31A1.358,1.358,0,0,1,15.54,1.93Z"
          transform="translate(240.27 192.01)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.445,4.064a4.17,4.17,0,0,1-1.21,2.95A4.156,4.156,0,0,1,4.8,8.174l-2.46.27a2.114,2.114,0,0,1-2.33-2.35l.27-2.46A4.077,4.077,0,0,1,4.295,0a5.956,5.956,0,0,1,.6.01A4.025,4.025,0,0,1,7.255,1.2a3.916,3.916,0,0,1,1.16,2.29C8.425,3.684,8.445,3.874,8.445,4.064Z"
          transform="translate(235.985 203.556)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M4.73,4.73A4.733,4.733,0,0,0,0,0"
          transform="translate(243.51 199.74)"
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
          transform="translate(234 190)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
