import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function VideoSlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="video-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="video-slash-2"
        data-name="video-slash"
        transform="translate(-172 -254)"
      >
        <Path
          id="Vector"
          d="M14.63,4s.03-.95,0-1.26C14.46.7,13.13,0,10.52,0H4.21C1.05,0,0,1.05,0,4.21v8.42a4.2,4.2,0,0,0,1.37,3.34l.63.45"
          transform="translate(174 257.58)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M9.48,0V5.26c0,3.16-1.05,4.21-4.21,4.21H0"
          transform="translate(179.26 264.95)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M5.26,0V9.07c0,1.67-1.12,2.25-2.48,1.29L0,8.41"
          transform="translate(188.74 260.74)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M20,0,0,20"
          transform="translate(174.02 256.19)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(172 254)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
