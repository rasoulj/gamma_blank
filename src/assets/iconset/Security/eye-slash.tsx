import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function EyeSlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="eye-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="eye-slash-2"
        data-name="eye-slash"
        transform="translate(-172 -188)"
      >
        <Path
          id="Vector"
          d="M6.11,1.05,1.05,6.11A3.578,3.578,0,1,1,6.11,1.05Z"
          transform="translate(180.42 196.42)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M15.6,2.04A9.631,9.631,0,0,0,9.785,0C6.255,0,2.965,2.08.675,5.68a5.326,5.326,0,0,0,0,5.19,14.326,14.326,0,0,0,2.71,3.17"
          transform="translate(174.215 191.73)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,11.6a9.215,9.215,0,0,0,3.58.74c3.53,0,6.82-2.08,9.11-5.68a5.326,5.326,0,0,0,0-5.19A16.222,16.222,0,0,0,11.63,0"
          transform="translate(180.42 195.93)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M2.82,0A3.565,3.565,0,0,1,0,2.82"
          transform="translate(184.69 200.7)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M7.47,0,0,7.47"
          transform="translate(174 202.53)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M7.47,0,0,7.47"
          transform="translate(186.53 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(196 212) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
