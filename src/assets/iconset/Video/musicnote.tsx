import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MusicnoteIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="musicnote"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="musicnote-2"
        data-name="musicnote"
        transform="translate(-684 -318)"
      >
        <Path
          id="Vector"
          d="M8,4A4,4,0,1,1,4,0,4,4,0,0,1,8,4Z"
          transform="translate(687.97 332)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,14V0"
          transform="translate(695.97 322)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M2.63.138l4.42,1.47A3.052,3.052,0,0,1,9,4.308v1.17a1.881,1.881,0,0,1-2.63,1.9L1.95,5.908A3.052,3.052,0,0,1,0,3.208V2.028A1.873,1.873,0,0,1,2.63.138Z"
          transform="translate(695.98 319.972)"
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
          transform="translate(684 318)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
