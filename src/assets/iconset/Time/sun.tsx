import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function SunIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="sun"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="sun-2" data-name="sun" transform="translate(-172 -188)">
        <Path
          id="Vector"
          d="M13,6.5A6.5,6.5,0,1,1,6.5,0,6.5,6.5,0,0,1,13,6.5Z"
          transform="translate(177.5 193.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M17.01,2.99l.13-.13ZM2.86,17.14l.13-.13ZM10,.08v0ZM10,20v0ZM.08,10h0ZM20,10h0ZM2.99,2.99l-.13-.13ZM17.14,17.14l-.13-.13"
          transform="translate(174 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(196 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
