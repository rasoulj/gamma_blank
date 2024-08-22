import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function RepeateMusicIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="repeate-music"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="repeate-music-2"
        data-name="repeate-music"
        transform="translate(-684 -514)"
      >
        <Path
          id="Vector"
          d="M12.01,0l2.44,2.34L6.5,2.32A6.512,6.512,0,0,0,1.91,13.44"
          transform="translate(685.99 517)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M2.44,13.44,0,11.1l7.95.02A6.512,6.512,0,0,0,12.54,0"
          transform="translate(691.56 521.56)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H6"
          transform="translate(693 526)"
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
          transform="translate(684 514)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
