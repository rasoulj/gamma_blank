import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function PeopleIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="people"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="profile-2user" transform="translate(-172 -252)">
        <Path
          id="Vector"
          d="M4.6,8.87a1.818,1.818,0,0,0-.33,0,4.445,4.445,0,1,1,.33,0Z"
          transform="translate(176.56 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M.13,0a3.5,3.5,0,0,1,3.5,3.5A3.5,3.5,0,0,1,.26,7,1.129,1.129,0,0,0,0,7"
          transform="translate(188.28 256)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M1.815,1.373c-2.42,1.62-2.42,4.26,0,5.87a9.766,9.766,0,0,0,10.01,0c2.42-1.62,2.42-4.26,0-5.87A9.812,9.812,0,0,0,1.815,1.373Z"
          transform="translate(174.345 265.188)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,6a4.837,4.837,0,0,0,1.96-.87,2.533,2.533,0,0,0,0-4.27A4.973,4.973,0,0,0,.03,0"
          transform="translate(190.34 266)"
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
          transform="translate(196 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
