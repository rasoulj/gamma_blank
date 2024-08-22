import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function RoutingIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="routing"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="routing-2" data-name="routing" transform="translate(-748 -252)">
        <Path
          id="Vector"
          d="M.1,2.6c.8-3.46,6.01-3.46,6.8,0,.47,2.03-.82,3.75-1.94,4.82a2.137,2.137,0,0,1-2.93,0C.919,6.345-.371,4.625.1,2.6Z"
          transform="translate(749.971 254.005)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M.1,2.6c.8-3.46,6.04-3.46,6.84,0,.47,2.03-.82,3.75-1.95,4.82a2.149,2.149,0,0,1-2.94,0C.919,6.345-.371,4.625.1,2.6Z"
          transform="translate(762.971 266.005)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M4.677,0h2.68a2,2,0,0,1,1.32,3.51L.687,10.5A2,2,0,0,0,2,14h2.68"
          transform="translate(755.323 257)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M.636.5H.648"
          transform="translate(752.85 257)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M.636.5H.648"
          transform="translate(765.85 269)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(772 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
