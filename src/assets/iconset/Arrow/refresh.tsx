import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function RefreshIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="refresh"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="refresh-2" transform="translate(-364 -316)">
        <Path
          id="Vector"
          d="M1.11,14.44v5"
          transform="translate(366 318)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M20,10A10,10,0,0,1,10,20c-5.52,0-8.89-5.56-8.89-5.56H5.63M0,10A9.978,9.978,0,0,1,10,0,12.3,12.3,0,0,1,20,5.56m0,0v-5m0,5H15.56"
          transform="translate(366 318)"
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
          transform="translate(388 340) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
