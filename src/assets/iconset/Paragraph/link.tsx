import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function LinkIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="link"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="link-2" data-name="link" transform="translate(-556 -316)">
        <Path
          id="Vector"
          d="M1.27,9A5.46,5.46,0,0,1,0,5.5,5.516,5.516,0,0,1,5.5,0h5a5.5,5.5,0,0,1,0,11H8"
          transform="translate(558 319)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M14.73,2A5.46,5.46,0,0,1,16,5.5,5.516,5.516,0,0,1,10.5,11h-5a5.5,5.5,0,0,1,0-11H8"
          transform="translate(562 326)"
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
          transform="translate(556 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
