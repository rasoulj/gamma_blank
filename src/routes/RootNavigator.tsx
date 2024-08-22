import React from "react";
import useAuthStore from "~/stores/authStore";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { linking } from "~/services/linking";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import MainStack from "./MainStack";

const Stack = createNativeStackNavigator<any>();

export default function RootNavigator() {
  const isUserLoggedIn = useAuthStore((state) => state.isUserLoggedIn);
  const isOnboardingVisited = useAuthStore(
    (state) => state.isOnboardingVisited
  );
  const isIntroVisited = useAuthStore((state) => state.isIntroVisited);
  const user = useAuthStore((state) => state.user);

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    ...CommonActions,
    animationTypeForReplace: !isUserLoggedIn ? "push" : "pop",
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={screenOptions}>
        {getCurrentStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );

  function getCurrentStack() {
    return <Stack.Screen name={"Main"} component={MainStack} />;
  }
}
