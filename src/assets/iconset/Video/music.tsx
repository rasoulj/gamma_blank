import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MusicIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="music"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="music-2" data-name="music" transform="translate(-748 -318)">
        <Path
          id="Vector"
          d="M6.24,3.12A3.12,3.12,0,1,1,3.12,0,3.12,3.12,0,0,1,6.24,3.12Z"
          transform="translate(751.16 333.76)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M11.44,14.875V2.675c0-2.6-1.63-2.96-3.28-2.51l-6.24,1.7A2.491,2.491,0,0,0,0,4.375v12.57"
          transform="translate(757.4 319.925)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M6.24,3.12A3.12,3.12,0,1,1,3.12,0,3.12,3.12,0,0,1,6.24,3.12Z"
          transform="translate(762.6 331.68)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,3.12,11.44,0"
          transform="translate(757.4 324.4)"
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
          transform="translate(748 318)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
