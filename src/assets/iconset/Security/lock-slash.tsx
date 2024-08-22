import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function LockSlashIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="lock-slash"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="lock-slash-2"
        data-name="lock-slash"
        transform="translate(-300 -252)"
      >
        <Path
          id="Vector"
          d="M0,3.04a2.521,2.521,0,0,0,1.98.98A2.505,2.505,0,0,0,3.97,0"
          transform="translate(310.02 266.48)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-2"
          data-name="Vector"
          d="M.82,10.8C.21,10.04,0,8.83,0,7V5C0,1,1,0,5,0H15c.36,0,.69.01,1,.03C19.17.21,20,1.36,20,5V7c0,4-1,5-5,5H5c-.36,0-.69-.01-1-.03"
          transform="translate(302 262)"
          fill="none"
          stroke={getColor({ theme, color })}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,8V6C0,2.69,1,0,6,0c4.15,0,5.54,1.38,5.9,3.56"
          transform="translate(306 254)"
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
          transform="translate(302 254)"
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
          transform="translate(324 276) rotate(180)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
