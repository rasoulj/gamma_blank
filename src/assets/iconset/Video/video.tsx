import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function VideoIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="video"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="video-2" data-name="video" transform="translate(-108 -254)">
        <Path
          id="Vector"
          d="M10.53,16.84H4.21C1.05,16.84,0,14.74,0,12.63V4.21C0,1.05,1.05,0,4.21,0h6.32c3.16,0,4.21,1.05,4.21,4.21v8.42C14.74,15.79,13.68,16.84,10.53,16.84Z"
          transform="translate(110 257.58)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M2.78,10.667,0,8.717V2.407L2.78.457c1.36-.95,2.48-.37,2.48,1.3v7.62C5.26,11.047,4.14,11.627,2.78,10.667Z"
          transform="translate(124.74 260.433)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"
          transform="translate(118 262)"
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
          transform="translate(108 254)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
