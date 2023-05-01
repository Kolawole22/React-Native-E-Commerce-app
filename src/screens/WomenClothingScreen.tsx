//import { Image } from "expo-image";
import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import MenuComponent from "../Components/ItemsComponent";

const WomenClothingScreen = () => {
  return (
    <SafeAreaView style={tw`bg-orange-500  flex-1 `}>
      <MenuComponent itemProp="women's clothing" />
    </SafeAreaView>
  );
};

export default memo(WomenClothingScreen);
