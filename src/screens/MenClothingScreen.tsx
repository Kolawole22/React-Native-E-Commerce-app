//import { Image } from "expo-image";
import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import ItemsComponent from "../Components/ItemsComponent";

const MenClothingScreen = () => {
  return (
    <SafeAreaView style={tw`bg-orange-500 flex-1 `}>
      <ItemsComponent itemProp="men's clothing" />
    </SafeAreaView>
  );
};

export default memo(MenClothingScreen);
