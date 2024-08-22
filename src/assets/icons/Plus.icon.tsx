import * as React from "react";
import { Pressable } from "react-native";
import Svg, { Path, G } from "react-native-svg";
import { getColor } from "~/components/elemental/helper";
import theme from "~/theme";

function PlusIcon({ style = {}, color: iconColor, ...props }: any) {
  const color =
    getColor({
      color: iconColor || "gray.400",
      theme,
    }) || "#333333";

  return (
    <Pressable onPress={props?.onPress} disabled={!props?.onPress}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={style?.width || 15.188}
        height={style?.height || 15.188}
        style={{
          ...style,
        }}
        viewBox="0 0 15.188 15.188"
        {...props}
      >
        <G data-name="Light Theme/Add">
          <Path
            data-name="Path 29897"
            d="M20.188 13.679h-6.509v6.509h-2.17v-6.509H5v-2.17h6.509V5h2.17v6.509h6.509z"
            transform="translate(3357.594 -2554.406) translate(-3361.813 2550.188) translate(-.781 -.781)"
            fill={color}
          />
        </G>
      </Svg>
    </Pressable>
  );
}

export default PlusIcon;
