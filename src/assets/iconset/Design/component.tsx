import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ComponentIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="component"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="component-2"
        data-name="component"
        transform="translate(-236 -444)"
      >
        <Path
          id="Vector"
          d="M18.94,12.55l-6.39,6.39a3.634,3.634,0,0,1-5.11,0L1.05,12.55a3.634,3.634,0,0,1,0-5.11L7.44,1.05a3.634,3.634,0,0,1,5.11,0l6.39,6.39A3.634,3.634,0,0,1,18.94,12.55Z"
          transform="translate(238.01 446)"
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
          transform="translate(260 468) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
