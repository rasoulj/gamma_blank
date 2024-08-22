import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function XrpXrpIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="xrp-_xrp_"
      data-name="xrp-(xrp)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="xrp-_xrp_2" data-name="xrp-(xrp)" transform="translate(-736 -213)">
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(736 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M2.526,0h-1.4a1.048,1.048,0,0,0-.8,1.8l5.7,5.7a4.226,4.226,0,0,0,5.9,0l5.7-5.7a1.006,1.006,0,0,0-.7-1.8h-1.4a3.1,3.1,0,0,0-2.2.9l-3.6,3.6a1.087,1.087,0,0,1-1.5,0L4.726.9A3.1,3.1,0,0,0,2.526,0Z"
          transform="translate(738.974 215)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M2.43,8.7H1.03a1.04,1.04,0,0,1-.7-1.8l5.6-5.7a4.226,4.226,0,0,1,5.9,0l5.7,5.7a1.04,1.04,0,0,1-.7,1.8h-1.4a3.1,3.1,0,0,1-2.2-.9L9.63,4.2a1.087,1.087,0,0,0-1.5,0L4.53,7.8A3.118,3.118,0,0,1,2.43,8.7Z"
          transform="translate(739.07 226.3)"
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
          transform="translate(736 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
