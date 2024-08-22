import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function FlashSlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="flash-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="flash-slash-2"
        data-name="flash-slash"
        transform="translate(-492 -316)"
      >
        <Path
          id="Vector"
          d="M0,7.32V9.76c0,1.68.91,2.02,2.02.76l7.57-8.6C10.52.87,10.13,0,8.72,0H7.79"
          transform="translate(501.18 326.72)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M10.1,6.841V1.521c0-1.68-.91-2.02-2.02-.76l-7.57,8.6c-.93,1.05-.54,1.92.87,1.92h3.09v1.18"
          transform="translate(496.725 317.999)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M20,0,0,20"
          transform="translate(494 318)"
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
          transform="translate(492 316)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
