import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BinanceUsdBusdIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="binance-usd-_busd_"
      data-name="binance-usd-(busd)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="binance-usd-_busd_2"
        data-name="binance-usd-(busd)"
        transform="translate(-416 -213)"
      >
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(416 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M5.25.15.15,5.25a.483.483,0,0,0,0,.7l1.7,1.7a.483.483,0,0,0,.7,0l5.1-5.1a.483.483,0,0,0,0-.7L5.95.15A.483.483,0,0,0,5.25.15Z"
          transform="translate(422.15 215.25)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M9.15.15l-9,9a.483.483,0,0,0,0,.7l1.7,1.7a.483.483,0,0,0,.7,0l9-9a.483.483,0,0,0,0-.7L9.85.15A.483.483,0,0,0,9.15.15Z"
          transform="translate(422.15 219.15)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M9.15.15l-9,9a.483.483,0,0,0,0,.7l1.7,1.7a.483.483,0,0,0,.7,0l9-9a.483.483,0,0,0,0-.7L9.85.15A.483.483,0,0,0,9.15.15Z"
          transform="translate(426.05 223.05)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M1.85,4.25.15,2.55a.483.483,0,0,1,0-.7L1.85.15a.483.483,0,0,1,.7,0l1.7,1.7a.483.483,0,0,1,0,.7l-1.7,1.7A.483.483,0,0,1,1.85,4.25Z"
          transform="translate(418.25 222.55)"
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
          transform="translate(416 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
