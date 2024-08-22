import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Timer1IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="timer"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="timer-2" data-name="timer" transform="translate(-108 -188)">
        <Path
          id="Vector"
          d="M9.749,0H3.269c-3.76,0-4.05,3.38-2.02,5.22l10.52,9.56C13.8,16.62,13.509,20,9.749,20H3.269c-3.76,0-4.05-3.38-2.02-5.22l10.52-9.56C13.8,3.38,13.509,0,9.749,0Z"
          transform="translate(113.491 190)"
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
          transform="translate(108 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
