import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function HuobiTokenHtIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="huobi-token-_ht_"
      data-name="huobi-token-(ht)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="huobi-token-_ht_2"
        data-name="huobi-token-(ht)"
        transform="translate(-864 -213)"
      >
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(864 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M4.213,0s-.2,1-3.2,5c-2.9,3.8,1.3,6.6,1.8,7h.1C3.513,11.5,11.113,6.7,4.213,0Z"
          transform="translate(875.987 223)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.8,5.774A9.8,9.8,0,0,0,7,.174a.526.526,0,0,0-.9.2,25.75,25.75,0,0,1-4.5,8.5,6.945,6.945,0,0,0,3.2,11c1.9.5-.5-1-.8-4.1C3.7,11.874,8.8,8.974,8.8,5.774Z"
          transform="translate(868.997 215.026)"
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
          transform="translate(864 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
