import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ChainlinkLinkIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="chainlink-_link_"
      data-name="chainlink-(link)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="chainlink-_link_2"
        data-name="chainlink-(link)"
        transform="translate(-480 -213)"
      >
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(480 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M0,5.825v7.6a1.936,1.936,0,0,0,1,1.7l7,3.9a2.118,2.118,0,0,0,1.9,0l7-3.9a2.062,2.062,0,0,0,1-1.7v-7.6a1.936,1.936,0,0,0-1-1.7l-7-3.9a2.118,2.118,0,0,0-1.9,0l-7,3.8A2.234,2.234,0,0,0,0,5.825Z"
          transform="translate(483 215.375)"
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
          transform="translate(480 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
