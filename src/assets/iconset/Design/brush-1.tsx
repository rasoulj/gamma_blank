import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function Brush1IconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="brush"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="brush-2" data-name="brush">
        <Path
          id="Vector"
          d="M7,5.5V4H2A1.955,1.955,0,0,1,.59,3.41,1.955,1.955,0,0,1,0,2,2.014,2.014,0,0,1,1.81.01,1.148,1.148,0,0,1,2,0H17a1.148,1.148,0,0,1,.19.01,1.9,1.9,0,0,1,1.22.58,1.976,1.976,0,0,1,.58,1.59A2.069,2.069,0,0,1,16.89,4H12V5.5a2.5,2.5,0,0,1-5,0Z"
          transform="translate(2.5 14)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M16.356,3.3l-.48,8.71a1.148,1.148,0,0,0-.19-.01h-15a1.148,1.148,0,0,0-.19.01L.016,3.3A3,3,0,0,1,3,0h10.38A3,3,0,0,1,16.356,3.3Z"
          transform="translate(3.814 2)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0V5"
          transform="translate(7.99 2)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0V2"
          transform="translate(12 2)"
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
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
