import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MagicpenIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="magicpen"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="magicpen-2" data-name="magicpen" transform="translate(-298 -190)">
        <Path
          id="Vector"
          d="M.623,16.622a2.118,2.118,0,0,0,3,0l13-13a2.121,2.121,0,0,0-3-3l-13,13A2.118,2.118,0,0,0,.623,16.622Z"
          transform="translate(300.878 193.878)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M3,3,0,0"
          transform="translate(313.01 195.99)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M1.5.44,3,0,2.56,1.5,3,3,1.5,2.56,0,3,.44,1.5,0,0Z"
          transform="translate(305 192)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M1.5.44,3,0,2.56,1.5,3,3,1.5,2.56,0,3,.44,1.5,0,0Z"
          transform="translate(301 198)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M1.5.44,3,0,2.56,1.5,3,3,1.5,2.56,0,3,.44,1.5,0,0Z"
          transform="translate(316 203)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(298 190)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
