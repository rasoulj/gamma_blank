import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function FilterIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="filter"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="filter-2" data-name="filter" transform="translate(-556 -508)">
        <Path
          id="Vector"
          d="M2,0H15.2a2.006,2.006,0,0,1,2,2V4.2a3.733,3.733,0,0,1-1,2.3l-4.3,3.8a3.255,3.255,0,0,0-1,2.3v4.3a2.227,2.227,0,0,1-.9,1.7l-1.4.9a2.038,2.038,0,0,1-3.1-1.7V12.5a3.865,3.865,0,0,0-.8-2.1L.9,6.4a3.315,3.315,0,0,1-.9-2V2.1A2.03,2.03,0,0,1,2,0Z"
          transform="translate(559.4 510.1)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M4.93,0,0,7.9"
          transform="translate(562 510.1)"
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
          transform="translate(556 508)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
