import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { Pressable } from "react-native";
import theme from "~/theme";
import { getColor } from "~/utils/helper/theme.methods";

const SendIcon = ({ color, ...props }: any) => {
  const finalColor =
    color ||
    getColor({
      color: "gray.400",
    });
  return (
    <Pressable style={{ ...props?.style }} onPress={() => props?.onPress}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 22 22"
        {...props}
        fill="none"
      >
        <Path
          d="m7.4 6.32 8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92ZM10.11 13.65l3.58-3.59"
          stroke={finalColor}
          strokeWidth={props?.strokeWidth ?? 1.5}
          stroke-linecap="round"
          stroke-linejoin="round"
        ></Path>
      </Svg>
    </Pressable>
  );
};

export default SendIcon;
