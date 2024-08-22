import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function HospitalIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="hospital"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="hospital-2" data-name="hospital" transform="translate(-748 -188)">
        <Path
          id="Vector"
          d="M0,0H20"
          transform="translate(750 210)"
          fill="#292d32"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M14,0H4C1,0,0,1.79,0,4V20H18V4C18,1.79,17,0,14,0Z"
          transform="translate(751 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M5.07,0H.94A.945.945,0,0,0,0,.94V7H6V.94A.924.924,0,0,0,5.07,0Z"
          transform="translate(756.99 203)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <G id="Group">
          <Path
            id="Vector-4"
            data-name="Vector"
            d="M0,0V5"
            transform="translate(760 194)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-5"
            data-name="Vector"
            d="M0,0H5"
            transform="translate(757.5 196.5)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(748 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
