//import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
//import HomeScreen from "../screens/HomeScreen";
import HomeStack from "./HomeStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ImageBackground } from "react-native";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
//import OrderTrackerScreen from "../screens/OrderTrackerScreen";

// Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
//const Tab = createBottomTabNavigator();

const CustomDrawerHeader = () => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginLeft: 16 }}
    >
      <Text style={{ fontSize: 18 }}>Menu</Text>
      <Text style={{ fontSize: 12, marginLeft: 8, color: "gray" }}>
        (v1.0.0)
      </Text>
    </View>
  );
};

export default function HomeNav() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStatusBarAnimation: "fade",
          drawerStyle: { backgroundColor: "#f5f5f5" },
        }}
      >
        <Drawer.Screen
          name="home"
          component={HomeStack}
          options={{
            headerShown: false,
            drawerLabel: "Home",
            drawerActiveTintColor: "#f97316",

            drawerIcon: (tabInfo) => {
              return <Ionicons name="home" size={24} color="#f97316" />;
            },
          }}
        />
        <Drawer.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            drawerLabel: "Settings",
            drawerActiveTintColor: "#f97316",

            drawerIcon: (tabInfo) => {
              return <Ionicons name="settings" size={24} color="#f97316" />;
            },
          }}
        />
        <Drawer.Screen
          name="history"
          component={OrderHistoryScreen}
          options={{
            headerShown: false,
            drawerLabel: "Orders",
            drawerActiveTintColor: "purple",

            drawerIcon: (tabInfo) => {
              return <Ionicons name="ios-list" size={24} color="#f97316" />;
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
