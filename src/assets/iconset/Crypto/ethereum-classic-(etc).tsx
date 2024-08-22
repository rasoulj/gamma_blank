import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function EthereumClassicEtcIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="ethereum-classic-_etc_"
      data-name="ethereum-classic-(etc)"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="ethereum-classic-_etc_2"
        data-name="ethereum-classic-(etc)"
        transform="translate(-992 -213)"
      >
        <Path
          id="BG_1"
          data-name="BG 1"
          d="M0,0H24V24H0Z"
          transform="translate(992 213)"
          fill="none"
        />
        <Path
          id="Vector"
          d="M.566,7.1,5.366,5a.846.846,0,0,1,.7,0l4.8,2.1a.44.44,0,0,0,.5-.7l-5-6.1a.75.75,0,0,0-1.2,0l-5,6.1C-.234,6.8.166,7.3.566,7.1Z"
          transform="translate(998.334 215)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M.566.046l4.8,2.1a.846.846,0,0,0,.7,0l4.8-2.1a.44.44,0,0,1,.5.7l-5,6.1a.75.75,0,0,1-1.2,0l-5-6.1C-.234.346.166-.154.566.046Z"
          transform="translate(998.334 227.854)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M5.2,0,0,2.6,5.2,5.2l5.2-2.6Z"
          transform="translate(998.8 222.4)"
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
          transform="translate(992 213)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
