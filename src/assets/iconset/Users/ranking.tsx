import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function RankingIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="ranking"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="ranking-2" data-name="ranking" transform="translate(-492 -636)">
        <Path
          id="Vector"
          d="M6.67,0H2A2.006,2.006,0,0,0,0,2V8H6.67Z"
          transform="translate(494 650)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M4.67,0H2A2.006,2.006,0,0,0,0,2V12H6.67V2A2,2,0,0,0,4.67,0Z"
          transform="translate(500.66 646)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M4.67,0H0V5H6.67V2A2.006,2.006,0,0,0,4.67,0Z"
          transform="translate(507.33 653)"
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
            d="M3.526.426l.53,1.06a.6.6,0,0,0,.42.31l.96.16c.61.1.76.55.32.98l-.75.75a.639.639,0,0,0-.16.54l.21.92c.17.73-.22,1.01-.86.63l-.9-.53a.618.618,0,0,0-.59,0l-.9.53c-.64.38-1.03.1-.86-.63l.21-.92A.63.63,0,0,0,1,3.686l-.74-.74c-.44-.44-.3-.88.32-.98l.96-.16a.666.666,0,0,0,.42-.31l.53-1.06C2.776-.144,3.236-.144,3.526.426Z"
            transform="translate(500.994 637.644)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(492 636)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
