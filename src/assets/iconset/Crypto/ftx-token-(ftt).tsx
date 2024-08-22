import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function FtxTokenFttIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="ftx-token-_ftt_"
      data-name="ftx-token-(ftt)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="ftx-token-_ftt_2"
        data-name="ftx-token-(ftt)"
        transform="translate(-672 -213)"
      >
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(672 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M13,0H1A.945.945,0,0,0,0,1V4A.945.945,0,0,0,1,5H13a.945.945,0,0,0,1-1V1A.945.945,0,0,0,13,0Z"
          transform="translate(680 215)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H5V5H0Z"
          transform="translate(679 230)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H5V5H0Z"
          transform="translate(674 222.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H8.5V4.7H0Z"
          transform="translate(681.5 222.6)"
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
          transform="translate(672 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
