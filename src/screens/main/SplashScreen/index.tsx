import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import styles from "./styles";
import {
  isIOS,
  Layout,
  useNavigate,
  relativeTime,
  convertTimeSpanToTime,
  Splash,
} from "~/components";

export default function Splashscreen({ navigation, route }) {
  const { navigateWithName } = useNavigate();

  return (
    <Layout fullscreen>
      <Splash
        data-id="Splash-9Lk9L"
        data-name="Splash"
        style={styles.Splash}
        data-parent="screen"
        textColor={{ color: "#FFFFFF" }}
        Urlsplash="https://apsygammastorage.blob.core.windows.net/images/QMw9e3XibF.jpg"
        appName="ras2blank2mainprd11451"
      />
    </Layout>
  );
}
