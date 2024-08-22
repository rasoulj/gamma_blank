import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function TagUserIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="tag-user"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G id="tag-user-2" data-name="tag-user" transform="translate(-556 -252)">
        <Path
          id="Vector"
          d="M15,16.86h-.76a2.988,2.988,0,0,0-2.12.87l-1.71,1.69a2.022,2.022,0,0,1-2.83,0L5.87,17.73a3,3,0,0,0-2.12-.87H3a2.983,2.983,0,0,1-3-2.97V2.97A2.983,2.983,0,0,1,3,0H15a2.983,2.983,0,0,1,3,2.97V13.88A2.992,2.992,0,0,1,15,16.86Z"
          transform="translate(559 254)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <G id="Group">
          <Path
            id="Vector-2"
            data-name="Vector"
            d="M2.03,3.9H1.88A1.951,1.951,0,1,1,3.9,1.95,1.923,1.923,0,0,1,2.03,3.9Z"
            transform="translate(566.04 257.05)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <Path
            id="Vector-3"
            data-name="Vector"
            d="M1,.75A1.806,1.806,0,0,0,1,3.98a5.37,5.37,0,0,0,5.5,0A1.806,1.806,0,0,0,6.5.75,5.417,5.417,0,0,0,1,.75Z"
            transform="translate(564.253 263.21)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-4"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(556 252)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
