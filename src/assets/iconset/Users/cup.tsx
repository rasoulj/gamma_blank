import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function CupIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="cup"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="cup-2" data-name="cup" transform="translate(-364 -380)">
        <Path
          id="Vector"
          d="M0,0V2.1"
          transform="translate(376.15 396.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,3H10V2A2.006,2.006,0,0,0,8,0H2A2.006,2.006,0,0,0,0,2V3Z"
          transform="translate(371.15 399)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H12"
          transform="translate(370.15 402)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M7,14A7,7,0,0,1,0,7V4A4,4,0,0,1,4,0h6a4,4,0,0,1,4,4V7A7,7,0,0,1,7,14Z"
          transform="translate(369 382)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M3.43,7.3A4.859,4.859,0,0,1,1.5,6.1,5.334,5.334,0,0,1,0,2.5,2.476,2.476,0,0,1,2.5,0h.65a3.756,3.756,0,0,0-.3,1.5v3A7.047,7.047,0,0,0,3.43,7.3Z"
          transform="translate(366.04 384.35)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,7.3A4.859,4.859,0,0,0,1.93,6.1a5.334,5.334,0,0,0,1.5-3.6A2.476,2.476,0,0,0,.93,0H.28a3.756,3.756,0,0,1,.3,1.5v3A7.047,7.047,0,0,1,0,7.3Z"
          transform="translate(382.53 384.35)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(364 380)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
