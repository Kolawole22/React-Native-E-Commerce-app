import { View, Text, TouchableOpacity } from "react-native";
import React, { memo, useMemo } from "react";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HeaderCard = () => {
  //type state = {};
  const navigation: any = useNavigation();
  const cartItem = useSelector((state: RootState) => state.cart);
  const count = useMemo(() => cartItem.count, [cartItem.count]);
  //const cartTotal = useSelector((state: RootState) => state.total);
  return (
    <>
      <StatusBar backgroundColor="#f97316" barStyle="light-content" />

      <SafeAreaView style={tw`bg-orange-500`}>
        <View style={tw`mb-0 flex-row bg-orange-500`}>
          <View style={tw`mr-4`}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu-outline" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <View style={tw`rounded-md border-1  w-64`}>
            <Text
              style={[tw`text-white text-6`, { fontFamily: "ShantellBold" }]}
            >
              Hey there,
            </Text>
            <Text style={[tw`text-white`, { fontFamily: "ShantellBold" }]}>
              Let's Shop
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Ionicons name="cart" size={32} color="#fff" />
          </TouchableOpacity>

          <Badge
            value={count}
            status="warning"
            containerStyle={{
              position: "absolute",
              top: 2,
              right: 15,
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default memo(HeaderCard);
