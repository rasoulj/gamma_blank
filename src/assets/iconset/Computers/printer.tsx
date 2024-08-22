import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function PrinterIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="printer"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="printer-2" data-name="printer" transform="translate(-300 -188)">
        <Path
          id="Vector"
          d="M0,5H9.5V3c0-2-.75-3-3-3H3C.75,0,0,1,0,3Z"
          transform="translate(307.25 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8,0V4A2.652,2.652,0,0,1,5,7H3A2.652,2.652,0,0,1,0,4V0Z"
          transform="translate(308 203)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M18,3V8a2.652,2.652,0,0,1-3,3H13V8H5v3H3A2.652,2.652,0,0,1,0,8V3A2.652,2.652,0,0,1,3,0H15A2.652,2.652,0,0,1,18,3Z"
          transform="translate(303 195)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M10,0H0"
          transform="translate(307 203)"
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
          transform="translate(307 199)"
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
