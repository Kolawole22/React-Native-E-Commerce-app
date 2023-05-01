import React from "react";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { useItemData } from "../../utils/hooks/useItemData";
import AuthStack from "./AuthStack";
import HomeNav from "./HomeNav";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootNavigation() {
  const { user, isLoaded } = useAuthentication();

  const { storeItems, itemsLoaded } = useItemData();

  if (isLoaded && itemsLoaded) {
    //await SplashScreen.hideAsync()
    return user ? <HomeNav /> : <AuthStack />;
  }
  return (
    <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size="large"
        color="#f77b0f"
        style={{ justifyContent: "center", alignItems: "center" }}
      />
    </SafeAreaView>
  );
}
