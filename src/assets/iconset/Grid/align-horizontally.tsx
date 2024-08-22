import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function AlignHorizontallyIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="align-horizontally"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="align-horizontally-2"
        data-name="align-horizontally"
        transform="translate(-300 -316)"
      >
        <Path
          id="Vector"
          d="M0,12.9V2.1C0,.6.64,0,2.23,0H3.27C4.86,0,5.5.6,5.5,2.1V12.9c0,1.5-.64,2.1-2.23,2.1H2.23C.64,15,0,14.4,0,12.9Z"
          transform="translate(304.75 320.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,8.9V2.1C0,.6.64,0,2.23,0H3.27C4.86,0,5.5.6,5.5,2.1V8.9c0,1.5-.64,2.1-2.23,2.1H2.23C.64,11,0,10.4,0,8.9Z"
          transform="translate(313.25 322.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H2.4"
          transform="translate(302 328)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H2"
          transform="translate(311 328)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M2.69,0H0"
          transform="translate(319.31 328)"
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
          transform="translate(300 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
