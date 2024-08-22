import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { Pressable, TouchableOpacity } from "react-native";
import { getColor, isDark, theme } from "~/components/elemental";

const TreeDotIcon = (props) => {
  const color =
    props.color ||
    getColor({ color: isDark() ? "gray.300" : "gray.500", theme }) ||
    "#292d32";
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="more" fill="none" stroke={color} strokeWidth={1.5}>
        <Path
          d="M561 198a2 2 0 102 2 2.006 2.006 0 00-2-2z"
          transform="rotate(-90 12 12) translate(-556 -188)"
        />
        <Path
          data-name="Vector"
          d="M575 198a2 2 0 102 2 2.006 2.006 0 00-2-2zM568 198a2 2 0 102 2 2.006 2.006 0 00-2-2z"
          transform="rotate(-90 12 12) translate(-556 -188)"
        />
      </G>
    </Svg>
  );
};

export default TreeDotIcon;
