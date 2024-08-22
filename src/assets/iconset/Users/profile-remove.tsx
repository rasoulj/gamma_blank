import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function ProfileRemoveIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="profile-remove"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="profile-remove-2"
        data-name="profile-remove"
        transform="translate(-236 -252)"
      >
        <Path
          id="Vector"
          d="M4,0H0"
          transform="translate(251.5 271)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M4.6,8.87a1.818,1.818,0,0,0-.33,0,4.445,4.445,0,1,1,.33,0Z"
          transform="translate(243.55 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M6.825,8.63a9.15,9.15,0,0,1-5.01-1.38c-2.42-1.62-2.42-4.26,0-5.87a9.766,9.766,0,0,1,10.01,0"
          transform="translate(241.165 265.18)"
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
          transform="translate(260 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
