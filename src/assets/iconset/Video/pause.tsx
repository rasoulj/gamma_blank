import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function PauseIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="pause"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="pause-2" data-name="pause" transform="translate(-620 -384)">
        <Path
          id="Vector"
          d="M7.65,16.11V1.89C7.65.54,7.08,0,5.64,0H2.01C.57,0,0,.54,0,1.89V16.11C0,17.46.57,18,2.01,18H5.64C7.08,18,7.65,17.46,7.65,16.11Z"
          transform="translate(623 387)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M7.65,16.11V1.89C7.65.54,7.08,0,5.64,0H2.01C.58,0,0,.54,0,1.89V16.11C0,17.46.57,18,2.01,18H5.64C7.08,18,7.65,17.46,7.65,16.11Z"
          transform="translate(633.35 387)"
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
          transform="translate(620 384)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
