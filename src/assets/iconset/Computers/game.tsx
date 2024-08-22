import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function GameIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="game"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="game-2" data-name="game" transform="translate(-172 -316)">
        <Path
          id="Vector"
          d="M3.05,0,0,3.05"
          transform="translate(178.52 328.46)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0,3.05,3.05"
          transform="translate(178.55 328.49)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H.01"
          transform="translate(185.53 330)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H.01"
          transform="translate(189.47 330)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,.02V0"
          transform="translate(187.5 331.96)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-6"
          data-name="Vector"
          d="M0,.02V0"
          transform="translate(187.5 328.02)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <Path
          id="Vector-7"
          data-name="Vector"
          d="M7,16h6c5,0,7-2,7-7V7c0-5-2-7-7-7H7C2,0,0,2,0,7V9C0,14,2,16,7,16Z"
          transform="translate(174 322)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-8"
          data-name="Vector"
          d="M2.03,0,2.02,1.01a1,1,0,0,1-1,.99H.99A1,1,0,0,0,1,4H2"
          transform="translate(182.98 318)"
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
          transform="translate(172 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
