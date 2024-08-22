import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { getColor } from "~/components/elemental/helper";
import theme from "~/theme";

const GearIcon = ({ color, ...props }: any) => {
  // @ts-ignore
  const colorFinal =
    color ||
    props?.style?.color ||
    theme?.components?.Icon?.color?.default ||
    "#292D32";
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G
        fill="none"
        // stroke={getColor({colorFinal, theme})}
        stroke={"#292D32"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <Path d="M15 12a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z" />
        <Path
          data-name="Vector"
          d="M2 12.88v-1.76a1.906 1.906 0 0 1 1.9-1.9c1.81 0 2.55-1.28 1.64-2.85a1.9 1.9 0 0 1 .7-2.59l1.73-.99a1.669 1.669 0 0 1 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19a1.669 1.669 0 0 1 2.28-.6l1.73.99a1.9 1.9 0 0 1 .7 2.59c-.91 1.57-.17 2.85 1.64 2.85a1.906 1.906 0 0 1 1.9 1.9v1.76a1.906 1.906 0 0 1-1.9 1.9c-1.81 0-2.55 1.28-1.64 2.85a1.9 1.9 0 0 1-.7 2.59l-1.73.99a1.669 1.669 0 0 1-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19a1.669 1.669 0 0 1-2.28.6l-1.73-.99a1.9 1.9 0 0 1-.7-2.59c.91-1.57.17-2.85-1.64-2.85a1.906 1.906 0 0 1-1.9-1.9Z"
        />
      </G>
    </Svg>
  );
};

export default GearIcon;
