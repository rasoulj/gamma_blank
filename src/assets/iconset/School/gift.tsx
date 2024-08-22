import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function GiftIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="gift"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="gift-2" data-name="gift" transform="translate(-236 -252)">
        <Path
          id="Vector"
          d="M16,0H0V8c0,3,1,4,4,4h8c3,0,4-1,4-4Z"
          transform="translate(239.97 262)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M19,2V3a1.8,1.8,0,0,1-2,2H2A1.777,1.777,0,0,1,0,3V2A1.777,1.777,0,0,1,2,0H17A1.8,1.8,0,0,1,19,2Z"
          transform="translate(238.5 257)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M5.768,3H.248a.936.936,0,0,1,.03-1.3L1.7.278a.96.96,0,0,1,1.35,0Z"
          transform="translate(241.872 254.003)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M5.52,3H0L2.72.278a.96.96,0,0,1,1.35,0L5.49,1.7A.936.936,0,0,1,5.52,3Z"
          transform="translate(248.35 254.003)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,0V5.14a1,1,0,0,0,1.55.84l.94-.62a1,1,0,0,1,1.1,0l.89.6a1,1,0,0,0,1.55-.83V0Z"
          transform="translate(244.94 262)"
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
          transform="translate(260 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
