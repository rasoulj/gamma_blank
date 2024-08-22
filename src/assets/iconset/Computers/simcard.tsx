import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function SimcardIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="simcard"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="simcard-2" data-name="simcard" transform="translate(-620 -316)">
        <Path
          id="Vector"
          d="M16.54,4.54,13.47,1.47A5,5,0,0,0,9.93,0H5A4.724,4.724,0,0,0,0,5V15a4.724,4.724,0,0,0,5,5h8a4.724,4.724,0,0,0,5-5V8.07A5,5,0,0,0,16.54,4.54Z"
          transform="translate(623 318)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M3,9H7a3.009,3.009,0,0,0,3-3V3A3.009,3.009,0,0,0,7,0H3A3.009,3.009,0,0,0,0,3V6A3.009,3.009,0,0,0,3,9Z"
          transform="translate(627 325.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0V9"
          transform="translate(632 325.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H9"
          transform="translate(627.5 330)"
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
          transform="translate(620 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
