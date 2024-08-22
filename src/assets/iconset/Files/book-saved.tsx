import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function BookSavedIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="book-saved"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="book-saved-2"
        data-name="book-saved"
        transform="translate(-108 -253)"
      >
        <Path
          id="Vector"
          d="M20,2.008v12.07a2.055,2.055,0,0,1-1.74,1.98l-.33.04a25.461,25.461,0,0,0-7.46,2.46,1.08,1.08,0,0,1-.96,0l-.04-.02A25.692,25.692,0,0,0,2.03,16.1l-.29-.04A2.055,2.055,0,0,1,0,14.078V2A1.967,1.967,0,0,1,2.16.008a18.757,18.757,0,0,1,7.06,2.34l.25.15a1.108,1.108,0,0,0,1.06,0l.17-.11A15.419,15.419,0,0,1,13,1.258v4.08l2-1.33,2,1.33V.118a7.761,7.761,0,0,1,.77-.1h.06A1.97,1.97,0,0,1,20,2.008Z"
          transform="translate(110 255.662)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0V15"
          transform="translate(120 258.49)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M4,0V5.22L2,3.89,0,5.22V1.14A20.211,20.211,0,0,1,4,0Z"
          transform="translate(123 255.78)"
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
          transform="translate(108 253)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
