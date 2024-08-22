import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function EmailNotificationIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="email-notification"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="sms-notification" transform="translate(-684 -250)">
        <Path
          id="Vector"
          d="M20,7v5c0,3.5-2,5-5,5H5c-3,0-5-1.5-5-5V5C0,1.5,2,0,5,0h7"
          transform="translate(686 253.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0,3.13,2.5a3.166,3.166,0,0,0,3.75,0l1.18-.94"
          transform="translate(691 259)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M5,2.5A2.5,2.5,0,1,1,2.5,0,2.5,2.5,0,0,1,5,2.5Z"
          transform="translate(701 253)"
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
          transform="translate(684 250)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
