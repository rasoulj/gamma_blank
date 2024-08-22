import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function WifiIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="wifi"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="wifi-2" data-name="wifi" transform="translate(-428 -572)">
        <G id="Group">
          <Path
            id="Vector"
            d="M0,2.49a11.353,11.353,0,0,1,14.19,0"
            transform="translate(432.91 581.35)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M0,3.51a16,16,0,0,1,20,0"
            transform="translate(430 576.85)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M0,1.83a8.317,8.317,0,0,1,10.41,0"
            transform="translate(434.79 585.66)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-4"
            data-name="Vector"
            d="M0,.915a4.166,4.166,0,0,1,5.21,0"
            transform="translate(437.4 590.235)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(428 572)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
