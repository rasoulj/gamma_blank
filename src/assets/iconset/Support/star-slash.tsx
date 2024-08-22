import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function StarSlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="star-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="star-slash-2"
        data-name="star-slash"
        transform="translate(-172 -188)"
      >
        <Path
          id="Vector"
          d="M3.279,16.573l.57-2.47a2.171,2.171,0,0,0-.52-1.81L.849,9.813c-1.46-1.46-.99-2.94,1.05-3.28L5.089,6A2.178,2.178,0,0,0,6.5,4.953l1.76-3.52c.95-1.91,2.51-1.91,3.47,0l1.76,3.52a2.046,2.046,0,0,0,.55.64"
          transform="translate(174.001 190.077)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M12.08,0c2.04.34,2.52,1.82,1.05,3.28L10.65,5.76a2.171,2.171,0,0,0-.52,1.81l.71,3.07c.56,2.43-.73,3.37-2.88,2.1L4.97,10.97a2.162,2.162,0,0,0-1.98,0L0,12.74"
          transform="translate(180.02 196.61)"
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
          transform="translate(174 190)"
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
          transform="translate(172 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
