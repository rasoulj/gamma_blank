import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MessagesIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="messages"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="messages-2" data-name="messages" transform="translate(-556 -314)">
        <G id="Group">
          <Path
            id="Vector"
            d="M15.98,4.79v4a6.065,6.065,0,0,1-.04.75c-.23,2.7-1.82,4.04-4.75,4.04h-.4a.805.805,0,0,0-.64.32l-1.2,1.6a1.132,1.132,0,0,1-1.92,0l-1.2-1.6a.924.924,0,0,0-.64-.32h-.4C1.6,13.58,0,12.79,0,8.79v-4C0,1.86,1.35.27,4.04.04A6.065,6.065,0,0,1,4.79,0h6.4Q15.975,0,15.98,4.79Z"
            transform="translate(558 320)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M15.94,4.79v4q0,4.41-4.04,4.75a6.065,6.065,0,0,0,.04-.75v-4q0-4.785-4.79-4.79H.75A6.065,6.065,0,0,0,0,4.04C.23,1.35,1.82,0,4.75,0h6.4Q15.935,0,15.94,4.79Z"
          transform="translate(562.04 316)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(556 314)"
          fill="none"
          opacity="0"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M.5.5H.5"
          transform="translate(569 326.75)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M.5.5H.5"
          transform="translate(565.5 326.75)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M.5.5H.5"
          transform="translate(562 326.75)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </G>
    </Svg>
  );
}
