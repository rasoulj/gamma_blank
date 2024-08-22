import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function KeyboardIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="keyboard"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="keyboard-2" data-name="keyboard" transform="translate(-300 -316)">
        <Path
          id="Vector"
          d="M5,0h9a11.95,11.95,0,0,1,1.66.09C18.29.38,19,1.62,19,5v6c0,3.38-.71,4.62-3.34,4.91A11.95,11.95,0,0,1,14,16H5a11.95,11.95,0,0,1-1.66-.09C.71,15.62,0,14.38,0,11V5C0,1.62.71.38,3.34.09A11.95,11.95,0,0,1,5,0Z"
          transform="translate(302.5 320)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H3.5"
          transform="translate(313.5 326)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H10"
          transform="translate(307 331.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M.495.5H.5"
          transform="translate(309.6 325.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M.495.5H.5"
          transform="translate(306.6 325.5)"
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
          transform="translate(300 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
