import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function HouseIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="house"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="house-2" transform="translate(-300 -188)">
        <Path
          id="Vector"
          d="M0,0H20"
          transform="translate(302 210)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,19.47.05,7.44A2.015,2.015,0,0,1,.82,5.87l7-5.45a2.011,2.011,0,0,1,2.46,0l7,5.44a1.99,1.99,0,0,1,.77,1.58V19.47"
          transform="translate(302.95 190.53)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M8.5,0h-7A1.5,1.5,0,0,0,0,1.5V11H10V1.5A1.5,1.5,0,0,0,8.5,0Z"
          transform="translate(307 199)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0V1.5"
          transform="translate(310 204.25)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H3"
          transform="translate(310.5 195.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(300 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
