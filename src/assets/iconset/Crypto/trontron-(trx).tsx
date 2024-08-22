import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function TrontronTrxIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="trontron-_trx_"
      data-name="trontron-(trx)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="trontron-_trx_2"
        data-name="trontron-(trx)"
        transform="translate(-800 -213)"
      >
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(800 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M.087,1.339l6.7,16.8c.4.9,1.1,1,1.7.2l9.4-11.9a.935.935,0,0,0-.1-1.3l-3.1-3.1a.683.683,0,0,0-.5-.3l-13-1.7C.287-.161-.213.439.087,1.339Z"
          transform="translate(802.513 215.261)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M7,18.1l1-11L0,0"
          transform="translate(803 215.9)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M6,0,0,6,9,4.2"
          transform="translate(811 217)"
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
          transform="translate(800 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
