import WomenClothingScreen from "../screens/WomenClothingScreen";
import JewelryScreen from "../screens/JewelryScreen";
import ElectronicsScreen from "../screens/ElectronicsScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions, Alert } from "react-native";
import MenClothingScreen from "../screens/MenClothingScreen";
import HeaderCard from "../Components/HeaderCard";
import { useEffect } from "react";
import { BackHandler } from "react-native";

const Tab = createMaterialTopTabNavigator();

// Stack = createNativeStackNavigator();

export default function HomeTab() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Confirm Exit",
        "Are you sure you want to exit the app?",
        [
          {
            text: "No",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => BackHandler.exitApp(),
          },
        ],
        { cancelable: false }
      );

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <HeaderCard />
      <Tab.Navigator
        initialLayout={{ width: Dimensions.get("window").width }}
        removeClippedSubviews
        initialRouteName="Men"
        screenOptions={{
          //tabBarScrollEnabled: true,
          tabBarStyle: {
            width: "auto",
            //borderBottomRightRadius: 16,
            //borderBottomLeftRadius: 16,
            borderBottomColor: "#f97316",
            backgroundColor: "#f97316",
          },
          tabBarAllowFontScaling: true,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: "#fff391",
          tabBarInactiveTintColor: "#fff",
          tabBarIndicatorStyle: {
            backgroundColor: "#F97316",
          },

          // or set to a fraction like { width: '50%' }
        }}
      >
        <Tab.Screen
          name="Men"
          component={MenClothingScreen}
          options={{
            tabBarLabel: "Men's\nClothes",
            tabBarLabelStyle: {
              fontSize: 9, // adjust the font size as needed
              fontWeight: "bold",
              //maxWidth: 200, // limit the maximum width of the label
              textAlign: "center", // center the label within the tab
            },
          }}
          //options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Women"
          component={WomenClothingScreen}
          options={{
            tabBarLabel: "Women's\nClothes",
            tabBarLabelStyle: {
              fontSize: 9, // adjust the font size as needed
              fontWeight: "bold",
              //maxWidth: 200, // limit the maximum width of the label
              textAlign: "center", // center the label within the tab
            },
          }}
          //options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Jewelries"
          component={JewelryScreen}
          options={{
            tabBarLabel: "Jewelries",
            tabBarLabelStyle: {
              fontSize: 9, // adjust the font size as needed
              fontWeight: "bold",
              //maxWidth: 200, // limit the maximum width of the label
              textAlign: "center", // center the label within the tab
            },
          }}
          //options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Electronics"
          component={ElectronicsScreen}
          options={{
            tabBarLabel: "Electronics",
            tabBarLabelStyle: {
              fontSize: 9,
              fontWeight: "bold", // adjust the font size as needed
              //maxWidth: 200, // limit the maximum width of the label
              textAlign: "center", // center the label within the tab
            },
          }}
          //options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
}
