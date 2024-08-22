import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function FingerScanIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="finger-scan"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="finger-scan-2"
        data-name="finger-scan"
        transform="translate(-556 -252)"
      >
        <Path
          id="Vector"
          d="M1.65,5.77A1.652,1.652,0,0,1,0,4.12V1.65a1.65,1.65,0,1,1,3.3,0V4.12A1.652,1.652,0,0,1,1.65,5.77Z"
          transform="translate(566.35 261.11)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M9.98,7.54A5,5,0,0,1,0,7.14V5a5,5,0,0,1,9.97-.51"
          transform="translate(563 257.93)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H2A4.724,4.724,0,0,1,7,5V7"
          transform="translate(571 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,7V5A4.724,4.724,0,0,1,5,0H7"
          transform="translate(558 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,7H2A4.724,4.724,0,0,0,7,2V0"
          transform="translate(571 267)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0V2A4.724,4.724,0,0,0,5,7H7"
          transform="translate(558 267)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(580 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
