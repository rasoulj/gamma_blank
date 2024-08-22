import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function TicketExpiredIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="ticket-expired"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="ticket-expired-2"
        data-name="ticket-expired"
        transform="translate(-620 -572)"
      >
        <Path
          id="Vector"
          d="M0,14.79H6.47c3.7,0,4.62-.92,4.62-4.62a2.315,2.315,0,0,1,0-4.63V4.62C11.09.92,10.17,0,6.47,0H.09V6.79"
          transform="translate(630.902 577.08)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.994,12.87v3H6.224c-1.48,0-2.35-1.01-3.31-3.33l-.18-.45A2.351,2.351,0,0,0,4.024,9a2.37,2.37,0,0,0-3.1-1.29l-.17-.43c-1.44-3.52-.94-4.75,2.58-6.2L5.974,0l3.02,7.32V9.87"
          transform="translate(622 576)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M.17,0H0"
          transform="translate(627.992 591.87)"
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
          transform="translate(620 572)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
