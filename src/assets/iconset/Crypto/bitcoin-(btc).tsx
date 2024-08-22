import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BitcoinBtcIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="bitcoin-_btc_"
      data-name="bitcoin-(btc)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="bitcoin-_btc_2"
        data-name="bitcoin-(btc)"
        transform="translate(-96 -213)"
      >
        <Path
          id="BG_2"
          data-name="BG 2"
          d="M0,0H24V24H0Z"
          transform="translate(96 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M0,0H4.685A1.943,1.943,0,0,1,6.565,1.881,1.881,1.881,0,0,1,4.685,3.762H0Z"
          transform="translate(105 221.381)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H5.354A2.025,2.025,0,0,1,7.5,1.881,2.025,2.025,0,0,1,5.354,3.762H0Z"
          transform="translate(105 225.131)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0V1.881"
          transform="translate(108.277 228.881)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0V1.881"
          transform="translate(105.935 228.881)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0V1.881"
          transform="translate(108.277 219.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0V1.881"
          transform="translate(105.935 219.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M3.277,0H0"
          transform="translate(103.5 221.381)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-8"
          data-name="Vector"
          d="M3.277,0H0"
          transform="translate(103.5 228.881)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-9"
          data-name="Vector"
          d="M20,10A10,10,0,1,1,10,0,10,10,0,0,1,20,10Z"
          transform="translate(98 215)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeWidth="1.5"
        />
        <Path
          id="Vector-10"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(96 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
