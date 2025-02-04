import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function GallerySlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="gallery-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="gallery-slash-2"
        data-name="gallery-slash"
        transform="translate(-492 -252)"
      >
        <Path
          id="Vector"
          d="M1.37,18.1C.43,16.97,0,15.31,0,13V7C0,2,2,0,7,0h6a8,8,0,0,1,4.92,1.23"
          transform="translate(494 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M15.01,0c.02.32.03.66.03,1.01v6c0,5-2,7-7,7h-6A12.905,12.905,0,0,1,0,13.87"
          transform="translate(498.96 259.99)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M4,2A2,2,0,1,1,2,0,2,2,0,0,1,4,2Z"
          transform="translate(498 258)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M20,0,0,20"
          transform="translate(494 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-5"
          data-name="Vector"
          d="M0,5.625a.773.773,0,0,0,1.09,0L6.12.585a1.992,1.992,0,0,1,2.82,0l1.63,1.64"
          transform="translate(503.43 262.825)"
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
          transform="translate(492 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
