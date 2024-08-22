import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function StickerIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="sticker"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="sticker-2" data-name="sticker" transform="translate(-620 -444)">
        <Path
          id="Vector"
          d="M19.961,10.861a3.333,3.333,0,0,1-.1.55,6,6,0,0,0-8.45,8.45,3.333,3.333,0,0,1-.55.1,10.106,10.106,0,0,1-2.62-.11,10.006,10.006,0,1,1,11.61-11.61A10.106,10.106,0,0,1,19.961,10.861Z"
          transform="translate(621.969 445.999)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M9.86,1.41a2.986,2.986,0,0,1-.77,1.3L2.71,9.09a2.986,2.986,0,0,1-1.3.77A6,6,0,0,1,9.86,1.41Z"
          transform="translate(631.97 456)"
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
          transform="translate(620 444)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
