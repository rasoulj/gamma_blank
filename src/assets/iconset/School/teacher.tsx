import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function TeacherIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="teacher"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="teacher-2" data-name="teacher" transform="translate(-172 -252)">
        <Path
          id="Vector"
          d="M7.467.531l-6.02,3.93a3.186,3.186,0,0,0,0,5.34l6.02,3.93a3.91,3.91,0,0,0,3.94,0L17.4,9.8a3.186,3.186,0,0,0,0-5.33L11.407.541A3.887,3.887,0,0,0,7.467.531Z"
          transform="translate(174.583 253.999)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M.01,0,0,4.69A3.411,3.411,0,0,0,2.18,7.72L5.37,8.78a3.846,3.846,0,0,0,2.02,0l3.19-1.06a3.411,3.411,0,0,0,2.18-3.03V.05"
          transform="translate(177.62 265.08)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,6V0"
          transform="translate(193.4 261)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(196 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
