import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function SpeedometerIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="speedometer"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="speedometer-2"
        data-name="speedometer"
        transform="translate(-492 -572)"
      >
        <Path
          id="Vector"
          d="M17.14,17a9.995,9.995,0,1,0-14.3-.01"
          transform="translate(494 574.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M6.76,3.38A3.38,3.38,0,1,1,3.38,0,3.38,3.38,0,0,1,6.76,3.38Z"
          transform="translate(500.62 586.74)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M.75,3H1.5A1.5,1.5,0,0,0,3,1.5,1.511,1.511,0,0,0,1.5,0,1.5,1.5,0,0,0,0,1.5v.75A.755.755,0,0,0,.75,3Z"
          transform="translate(506.5 581)"
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
          transform="translate(492 572)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
