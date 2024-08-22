import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { FC, useEffect } from "react";
import { LogBox, StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ElementalProvider,
  isDark,
  MatchSubscription,
  Modals,
  Toasts,
} from "~/components";
import GuestModeModal from "~/components/molecules/GuestMode/GuestModeModal";
import MessageSubscription from "~/components/organisms/MessageSubscription";
import NotificationSubscription from "~/components/organisms/NotificationSubscription";
import VideoCallSubscription from "~/components/organisms/VideoCallSubscription";
import { model } from "~/data/model";
import RootNavigator from "~/routes/RootNavigator";
import config from "config";
import ContractorSubscription from "~/components/organisms/ContractorSubscription";
import CustomerSubscription from "~/components/organisms/CustomerSubscription";
import IsTrialModal from "~/components/trial_mode";

LogBox.ignoreAllLogs(true);

const queryClient = new QueryClient();

GoogleSignin.configure({
  webClientId:
    "1038715186961-cbhn3mfu8nhb7f2sdktgsb5mo9lucpn6.apps.googleusercontent.com",
});

const subscriptionDependencies = new Map<FC, string[]>([
  [MessageSubscription, ["Chat"]],
  [VideoCallSubscription, ["LiveStream"]],
  [NotificationSubscription, ["Notification"]],
  [MatchSubscription, ["Matching"]],
  [ContractorSubscription, ["Booking"]],
  [CustomerSubscription, ["Booking"]],
]);

const subscriptions = Array.from(subscriptionDependencies.entries())
  .map(([Component, dependencies]: [FC, string[]]) => {
    if (
      model.screens.some((screen) =>
        screen.metaData.components.some((componentName) =>
          dependencies.includes(componentName)
        )
      )
    ) {
      return Component;
    }
  })
  .filter(Boolean);

export default function App() {
  useEffect(() => {
    const CheckStorage = async () => {
      await AsyncStorage.getItem(`auth-storage-${model?.name}`);
      setTimeout(SplashScreen.hide, 1000);
    };

    CheckStorage();
  }, []);

  return (
    <ElementalProvider
      gqlLogin="query user_getCurrentUser  { user_getCurrentUser  { status, result  { fullName, about, photoUrl, email, id, createdDate } } }"
      api={config}
    >
      <QueryClientProvider client={queryClient}>
        <GuestModeModal />
        <Toasts />
        <Modals />
        <StatusBar
          barStyle={isDark() ? "light-content" : "dark-content"}
          translucent
          backgroundColor="transparent"
        />
        <RootNavigator />
        {subscriptions.map((Component, index) => (
          <Component key={index} />
        ))}
        <IsTrialModal expireDate={new Date("2024-08-29T05:28:57.022Z")} />
      </QueryClientProvider>
    </ElementalProvider>
  );
}
