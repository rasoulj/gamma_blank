import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BuyCryptoIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="buy-crypto"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="buy-crypto-2"
        data-name="buy-crypto"
        transform="translate(-238 -188)"
      >
        <Path
          id="Vector"
          d="M13,6.5A6.5,6.5,0,0,1,6.5,13c-.17,0-.35-.01-.52-.02A6.509,6.509,0,0,0,.02,7.02C.01,6.85,0,6.67,0,6.5a6.5,6.5,0,0,1,13,0Z"
          transform="translate(247 190)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M13,6.5A6.5,6.5,0,1,1,6.5,0c.17,0,.35.01.52.02a6.509,6.509,0,0,1,5.96,5.96C12.99,6.15,13,6.33,13,6.5Z"
          transform="translate(240 197)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M1.62,1.62,2.5,0l.88,1.62L5,2.5l-1.62.88L2.5,5,1.62,3.38,0,2.5Z"
          transform="translate(244 201)"
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
          transform="translate(238 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
