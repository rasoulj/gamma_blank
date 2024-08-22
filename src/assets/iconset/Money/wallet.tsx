import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function WalletIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="wallet"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="wallet-2" data-name="wallet" transform="translate(-108 -508)">
        <Path
          id="Vector"
          d="M7.7.518l-.03.07-2.9,6.73H1.92A4.915,4.915,0,0,0,0,7.708l1.75-4.18.04-.1.07-.16a.865.865,0,0,1,.07-.17C3.24.068,4.72-.622,7.7.518Z"
          transform="translate(112.96 510)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M8.32,7a4.76,4.76,0,0,0-1.41-.2H0L2.9.07,2.93,0c.15.05.29.12.44.18l2.21.93A6.5,6.5,0,0,1,8.19,2.79a2.115,2.115,0,0,1,.25.36,1.522,1.522,0,0,1,.2.43,1.614,1.614,0,0,1,.09.26A4.728,4.728,0,0,1,8.32,7Z"
          transform="translate(117.73 510.518)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M19.51,4.88V6.83c0,.2-.01.4-.02.6-.19,3.49-2.14,5.25-5.84,5.25H5.85a5.519,5.519,0,0,1-.71-.05Q.37,12.315.05,7.54A5.519,5.519,0,0,1,0,6.83V4.88A4.894,4.894,0,0,1,2.96.39,4.952,4.952,0,0,1,4.88,0h9.76a5,5,0,0,1,1.41.2A4.9,4.9,0,0,1,19.51,4.88Z"
          transform="translate(110.012 517.318)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M4.71,0,2.96,4.18A4.894,4.894,0,0,0,0,8.67V5.74A5.849,5.849,0,0,1,4.71,0Z"
          transform="translate(110 513.528)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M3.46,5.17V8.1A4.879,4.879,0,0,0,0,3.43,4.9,4.9,0,0,0,.42.26,1.142,1.142,0,0,0,.33,0,5.823,5.823,0,0,1,3.46,5.17Z"
          transform="translate(126.059 514.098)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(108 508)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
