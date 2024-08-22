import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function EthereumEthIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="ethereum-_eth_"
      data-name="ethereum-(eth)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="ethereum-_eth_2"
        data-name="ethereum-(eth)"
        transform="translate(-160 -213)"
      >
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(160 213)"
          fill="none"
        />
        <G id="Group">
          <Path
            id="Vector"
            d="M4.224.8.484,5.463a1.9,1.9,0,0,0,.66,3.02l3.73,1.87a2.29,2.29,0,0,0,1.78,0l3.73-1.87a1.907,1.907,0,0,0,.66-3.02L7.314.8A1.888,1.888,0,0,0,4.224.8Z"
            transform="translate(166.226 215.247)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M0,0V5.26"
            transform="translate(172 215.3)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M0,3.15,4.2,0,8.4,3.15"
            transform="translate(167.8 220.56)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-4"
            data-name="Vector"
            d="M2.124.137l1.61.72a4,4,0,0,0,3.25,0l1.61-.72a1.5,1.5,0,0,1,1.77,2.32L6.9,6.687a1.93,1.93,0,0,1-3.1,0L.354,2.457A1.5,1.5,0,0,1,2.124.137Z"
            transform="translate(166.646 227.293)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(160 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
