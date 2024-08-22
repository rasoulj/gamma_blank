import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function RulerpenIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="ruler_pen"
      data-name="ruler&amp;pen"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="ruler_pen-2"
        data-name="ruler&amp;pen"
        transform="translate(-234 -318)"
      >
        <Path
          id="Vector"
          d="M10,17V3A2.652,2.652,0,0,0,7,0H3A2.652,2.652,0,0,0,0,3V17a2.652,2.652,0,0,0,3,3H7A2.652,2.652,0,0,0,10,17Z"
          transform="translate(245.47 320)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H5"
          transform="translate(245.47 324)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H4"
          transform="translate(245.47 336)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0,5,.05"
          transform="translate(245.47 331.95)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H3"
          transform="translate(245.47 328)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M2.96,0A2.964,2.964,0,0,0,0,2.95V15.91a3.532,3.532,0,0,0,.42,1.52l.82,1.36c.94,1.57,2.49,1.57,3.43,0l.82-1.36a3.532,3.532,0,0,0,.42-1.52V2.95A2.962,2.962,0,0,0,2.96,0Z"
          transform="translate(236.53 320)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M5.91,0H0"
          transform="translate(236.53 325)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-8"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(234 318)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
