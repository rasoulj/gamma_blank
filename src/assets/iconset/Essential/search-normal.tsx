import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function SearchNormalIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="search-normal"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="search-normal-2"
        data-name="search-normal"
        transform="translate(-428 -188)"
      >
        <Path
          id="Vector"
          d="M19,9.5A9.5,9.5,0,1,1,9.5,0,9.5,9.5,0,0,1,19,9.5Z"
          transform="translate(430 190)"
          fill={props?.fill || 'none'}
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M2,2,0,0"
          transform="translate(448 208)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(428 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
