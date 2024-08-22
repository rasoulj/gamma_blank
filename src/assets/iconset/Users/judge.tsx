import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function JudgeIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="judge"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="judge-2" data-name="judge" transform="translate(-684 -572)">
        <Path
          id="Vector"
          d="M4.95,4.95,0,0"
          transform="translate(699.06 585.56)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M11.2,11.185l-3.54,3.54a2,2,0,0,1-2.83,0l-4.24-4.24a2,2,0,0,1,0-2.83L7.655.585a2,2,0,0,1,2.83,0l4.24,4.24a2,2,0,0,1,0,2.83Z"
          transform="translate(687.865 574.375)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H6"
          transform="translate(686 593)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0,7.07,7.07"
          transform="translate(690.56 579.92)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(684 572)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
