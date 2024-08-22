import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function DownloadIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="Download"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="Download-2" data-name="Download" transform="translate(-620 -444)">
        <Path
          id="Vector"
          d="M13.96,0c3.6.31,5.07,2.16,5.07,6.21v.13c0,4.47-1.79,6.26-6.26,6.26H6.26C1.79,12.6,0,10.81,0,6.34V6.21C0,2.19,1.45.34,4.99.01"
          transform="translate(622.48 452.9)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0V12.88"
          transform="translate(632 446)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M6.7,0,3.35,3.35,0,0"
          transform="translate(628.65 456.65)"
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
          transform="translate(644 468) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
