import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ScanBarcodeIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="scan-barcode"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="scan-barcode-2"
        data-name="scan-barcode"
        transform="translate(-428 -252)"
      >
        <Path
          id="Vector"
          d="M0,7V4.5A4.494,4.494,0,0,1,4.5,0H7"
          transform="translate(430 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H2.5A4.494,4.494,0,0,1,7,4.5V7"
          transform="translate(443 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M6,0V1.5A4.494,4.494,0,0,1,1.5,6H0"
          transform="translate(444 268)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M7,7H4.5A4.494,4.494,0,0,1,0,2.5V0"
          transform="translate(430 267)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M5,1.5v2A1.326,1.326,0,0,1,3.5,5h-2A1.326,1.326,0,0,1,0,3.5v-2A1.326,1.326,0,0,1,1.5,0h2A1.326,1.326,0,0,1,5,1.5Z"
          transform="translate(433.5 257.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M5,1.5v2A1.326,1.326,0,0,1,3.5,5h-2A1.326,1.326,0,0,1,0,3.5v-2A1.326,1.326,0,0,1,1.5,0h2A1.326,1.326,0,0,1,5,1.5Z"
          transform="translate(441.5 257.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M5,1.5v2A1.326,1.326,0,0,1,3.5,5h-2A1.326,1.326,0,0,1,0,3.5v-2A1.326,1.326,0,0,1,1.5,0h2A1.326,1.326,0,0,1,5,1.5Z"
          transform="translate(433.5 265.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-8"
          data-name="Vector"
          d="M5,1.5v2A1.326,1.326,0,0,1,3.5,5h-2A1.326,1.326,0,0,1,0,3.5v-2A1.326,1.326,0,0,1,1.5,0h2A1.326,1.326,0,0,1,5,1.5Z"
          transform="translate(441.5 265.5)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-9"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(452 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
