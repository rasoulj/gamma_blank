import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function TicketIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="ticket"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="ticket-2" data-name="ticket" transform="translate(-492 -572)">
        <Path
          id="Vector"
          d="M17.5,8.5A2.5,2.5,0,0,1,20,6V5c0-4-1-5-5-5H5C1,0,0,1,0,5v.5A2.5,2.5,0,0,1,2.5,8,2.5,2.5,0,0,1,0,10.5V11c0,4,1,5,5,5H15c4,0,5-1,5-5A2.5,2.5,0,0,1,17.5,8.5Z"
          transform="translate(494 576)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0V16"
          transform="translate(502 576)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <Path
          id="Vector-3"
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
