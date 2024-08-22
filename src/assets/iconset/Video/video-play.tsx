import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function VideoPlayIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="video-play"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="video-play-2"
        data-name="video-play"
        transform="translate(-236 -384)"
      >
        <Path
          id="Vector"
          d="M20,13V7c0-5-2-7-7-7H7C2,0,0,2,0,7v6c0,5,2,7,7,7h6C18,20,20,18,20,13Z"
          transform="translate(238 386)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H18.96"
          transform="translate(238.52 391.11)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0V4.86"
          transform="translate(244.52 386.11)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0V4.41"
          transform="translate(251.48 386.11)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,2.929v-1.2C0,.189,1.09-.441,2.42.329l1.04.6,1.04.6c1.33.77,1.33,2.03,0,2.8l-1.04.6-1.04.6C1.09,6.3,0,5.669,0,4.129v-1.2Z"
          transform="translate(245.75 395.521)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(236 384)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
