import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, Path } from "react-native-svg";

export default function StrongboxIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="strongbox"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <Path
        id="Vector"
        d="M7,20h6c5,0,7-2,7-7V7c0-5-2-7-7-7H7C2,0,0,2,0,7v6C0,18,2,20,7,20Z"
        transform="translate(2 2)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        id="Vector-2"
        data-name="Vector"
        d="M3,14h8a2.652,2.652,0,0,0,3-3V3a2.652,2.652,0,0,0-3-3H3A2.652,2.652,0,0,0,0,3v8A2.652,2.652,0,0,0,3,14Z"
        transform="translate(5 5)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        id="Vector-3"
        data-name="Vector"
        d="M0,0H2.48a2.5,2.5,0,0,1,0,5H0"
        transform="translate(5 9.5)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        id="Vector-4"
        data-name="Vector"
        d="M3,0H0"
        transform="translate(16 9.99)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        id="Vector-5"
        data-name="Vector"
        d="M3,0H0"
        transform="translate(16 14)"
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
        fill="none"
        opacity="0"
      />
      <Path
        id="Vector-7"
        data-name="Vector"
        d="M0,0H.1"
        transform="translate(7.2 12)"
        fill="none"
        stroke={getColor({ theme, color })}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}
