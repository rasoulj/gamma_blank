import React from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useKeyboardHeight } from "../hooks/keyboard.hook.";
import { deviceHeight } from "~/components";

export const DismissKeyboardHOC = (Comp: any) => {
    return ({ children, ...props }) => (
        <GestureHandlerRootView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Comp {...props}>
                    {children}
                </Comp>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    );
};

export function DismissKeyboardView({ children, style = {}, ...props }) {
    const kh = useKeyboardHeight();
    const height = deviceHeight - 266 - kh;

    
    return <GestureHandlerRootView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[style, { height }]} {...props}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    </GestureHandlerRootView>
}