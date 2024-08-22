import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function AirdropIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="airdrop"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="airdrop-2" data-name="airdrop" transform="translate(-492 -380)">
        <Path
          id="Vector"
          d="M4.335,2.745a2.2,2.2,0,1,0-1.59,1.59A2.176,2.176,0,0,0,4.335,2.745Z"
          transform="translate(501.795 388.595)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M14.8,15.19A8.786,8.786,0,1,0,0,8.79a8.733,8.733,0,0,0,2.81,6.43"
          transform="translate(495.21 382)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M1.49,9.25a5.49,5.49,0,1,1,8,0"
          transform="translate(498.51 385.3)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M1.922.817.482,2.608a2.178,2.178,0,0,0,1.7,3.54h2.87a2.176,2.176,0,0,0,1.7-3.54L5.312.817A2.166,2.166,0,0,0,1.922.817Z"
          transform="translate(500.378 395.842)"
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
          transform="translate(516 404) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
