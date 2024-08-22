import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BusIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="bus"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="bus-2" data-name="bus" transform="translate(-243 -188)">
        <Path
          id="Vector"
          d="M12.9,20H3.1A3.109,3.109,0,0,1,0,16.9V3.1A3.109,3.109,0,0,1,3.1,0h9.8A3.109,3.109,0,0,1,16,3.1V16.9A3.1,3.1,0,0,1,12.9,20Z"
          transform="translate(247 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M14.5,5H1.5A1.5,1.5,0,0,1,0,3.5v-2A1.5,1.5,0,0,1,1.5,0h13A1.5,1.5,0,0,1,16,1.5v2A1.5,1.5,0,0,1,14.5,5Z"
          transform="translate(247 196)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M.495.5H.5"
          transform="translate(251 205.2)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M.495.5H.5"
          transform="translate(258 205.2)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H5"
          transform="translate(252.5 193)"
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
          transform="translate(243 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
