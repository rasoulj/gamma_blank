import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function GrammerlyIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="grammerly"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="grammerly-2"
        data-name="grammerly"
        transform="translate(-748 -316)"
      >
        <G id="Group">
          <Path
            id="Vector"
            d="M17.075,2.933a10.008,10.008,0,0,1-.2,14.34,10.111,10.111,0,0,1-13.74,0,10,10,0,1,1,13.94-14.34Z"
            transform="translate(749.995 318.018)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M7.67,0A5.652,5.652,0,0,1,0,0"
            transform="translate(756.17 332.07)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(772 340) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
