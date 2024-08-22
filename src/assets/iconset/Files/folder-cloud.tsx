import * as React from "react";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export default function FolderCloudIconSet(props: SvgProps) {
  const color =
    getColor({ color: props.color, theme }) ||
    theme?.components?.Icon?.color?.default ||
    "#292d32";

  return (
    <Svg
      {...props}
      id="folder-cloud"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G
        id="folder-cloud-2"
        data-name="folder-cloud"
        transform="translate(-556 -188)"
      >
        <Path
          id="Vector"
          d="M7,20H5c-4,0-5-1-5-5V5C0,1,1,0,5,0H6.5A2.362,2.362,0,0,1,8.9,1.2l1.5,2A1.585,1.585,0,0,0,12,4h3c4,0,5,1,5,5v2"
          transform="translate(558 190)"
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
            d="M1.762,4.316a1.873,1.873,0,0,0,0,3.74h5.56a2.706,2.706,0,0,0,1.82-.7,2.67,2.67,0,0,0-1.4-4.59,3.111,3.111,0,1,0-5.96,1.56"
            transform="translate(567.997 202.004)"
            fill="none"
            stroke={getColor({ theme, color })}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </G>
        <Path
          id="Vector-3"
          data-name="Vector"
          d="M0,0H24V24H0Z"
          transform="translate(556 188)"
          fill="none"
          opacity="0"
        />
      </G>
    </Svg>
  );
}
