import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function MusicFilterIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="music-filter"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="music-filter-2"
        data-name="music-filter"
        transform="translate(-364 -514)"
      >
        <Path
          id="Vector"
          d="M0,0H20"
          transform="translate(366 517)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M0,0H9"
          transform="translate(366 523)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H6"
          transform="translate(366 529)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H4"
          transform="translate(366 535)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <G id="Group">
          <Path
            id="Vector-5"
            data-name="Vector"
            d="M4.36,2.18A2.18,2.18,0,1,1,2.18,0,2.18,2.18,0,0,1,4.36,2.18Z"
            transform="translate(373.66 531.64)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-6"
            data-name="Vector"
            d="M7.98,10.373V1.863C7.98.053,6.84-.2,5.69.113L1.34,1.3A1.743,1.743,0,0,0,0,3.053v8.77"
            transform="translate(378.02 521.997)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-7"
            data-name="Vector"
            d="M4.36,2.18A2.18,2.18,0,1,1,2.18,0,2.18,2.18,0,0,1,4.36,2.18Z"
            transform="translate(381.64 530.19)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-8"
            data-name="Vector"
            d="M0,2.18,7.98,0"
            transform="translate(378.02 525.42)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-9"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(364 514)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
