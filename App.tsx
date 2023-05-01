import "react-native-gesture-handler";
//import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
//import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import "./config/firebase";
import RootNavigation from "./src/navigation";
import Bugsnag from "@bugsnag/expo";
import Constants from "expo-constants";

//SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    Bugsnag.start(Constants.manifest?.extra?.bugsnagKey);
    // Bugsnag.notify(new Error("Test error"));
    window.onerror = function (message: any, _source, _line, _column, error) {
      Bugsnag.notify(error || new Error(message));
    };
  }, []);

  const [loadedFonts] = useFonts({
    InterThin: require("./assets/fonts/Inter-ThinItalic.otf"),
    ShantellBold: require("./assets/fonts/ShantellSans-Bold.ttf"),
    Montserrat: require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.otf"),
    ShantellSans: require("./assets/fonts/ShantellSans-VariableFont.ttf"),
  });

  if (loadedFonts) {
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    );
  }
}
