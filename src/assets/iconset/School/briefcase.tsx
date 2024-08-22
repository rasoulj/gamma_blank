import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BriefcaseIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="briefcase"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="briefcase-2"
        data-name="briefcase"
        transform="translate(-108 -188)"
      >
        <Path
          id="Vector"
          d="M5.751,16h8c4.02,0,4.74-1.61,4.95-3.57l.75-8c.27-2.44-.43-4.43-4.7-4.43h-10C.481,0-.219,1.99.051,4.43l.75,8C1.011,14.39,1.731,16,5.751,16Z"
          transform="translate(110.249 194)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,4V3.2C0,1.43,0,0,3.2,0H4.8C8,0,8,1.43,8,3.2V4"
          transform="translate(116 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M4,1V2.02C4,3.11,3.99,4,2,4S0,3.12,0,2.03V1C0,0,0,0,1,0H3C4,0,4,0,4,1Z"
          transform="translate(118 200)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M7.65,0A16.484,16.484,0,0,1,0,3.02"
          transform="translate(122 199)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0A16.283,16.283,0,0,0,7.38,2.76"
          transform="translate(110.62 199.27)"
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
          transform="translate(132 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
