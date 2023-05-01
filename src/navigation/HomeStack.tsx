import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OrderScreen from "../screens/OrderScreen";
import CartScreen from "../screens/CartScreen";
import HomeTab from "./HomeTab";
import DessertScreen from "../screens/WomenClothingScreen";
//import OrderTrackerScreen from "../screens/OrderTrackerScreen";
//import BBQcreen from "../screens/BBQScreen";
//import homes
//import { createMaterialTopStackNavigator } from "@react-navigation/material-top-Stacks";

//const Stack = createMaterialTopStackNavigator();

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeTab">
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Orders"
        component={OrderScreen}
        //options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Tracker"
        component={OrderTrackerScreen}
        //options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
