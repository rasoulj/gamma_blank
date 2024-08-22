import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function HeadphoneIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="headphone"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="headphone-2"
        data-name="headphone"
        transform="translate(-620 -188)"
      >
        <Path
          id="Vector"
          d="M3.462,16.44V13.52a1.84,1.84,0,1,1,3.68,0v2.81a3.6,3.6,0,0,1-3.57,3.57A3.6,3.6,0,0,1,0,16.33V10.17A9.912,9.912,0,0,1,9.952,0,10.04,10.04,0,0,1,20,10.06v6.16a3.57,3.57,0,0,1-7.14,0V13.41a1.84,1.84,0,0,1,3.68,0v3.03"
          transform="translate(621.998 190.05)"
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
          transform="translate(620 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
