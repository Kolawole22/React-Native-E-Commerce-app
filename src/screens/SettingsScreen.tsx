import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import HeaderCard from "../Components/HeaderCard";
import { useNavigation } from "@react-navigation/native";
import { Badge } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from "../slices/cartSlice";
import type { RootState } from "../../store";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const SettingsScreen = () => {
  const navigation: any = useNavigation();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [addressBook, setAddressBook] = useState([
    { name: "Home", address: "123 Main St." },
    { name: "Work", address: "456 5th Ave." },
  ]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loyaltyProgram, setLoyaltyProgram] = useState(true);
  const [helpAndSupport, setHelpAndSupport] = useState(true);
  const [privacyAndSecurity, setPrivacyAndSecurity] = useState(true);
  const [appTheme, setAppTheme] = useState("Light");
  const cartItem = useSelector((state: RootState) => state.cart);

  function handleSignOut() {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        onPress: () => {
          signOut(auth)
            .then(() => console.log("User signed out!"))
            .catch((error) => console.log(error));
        },
      },
    ]);
  }

  return (
    <>
      <View style={tw`items-begin  mb-0 flex-row bg-orange-500`}>
        <View style={tw`mr-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View style={tw`rounded-md border-1   w-64`}>
          <Text style={[tw`text-white text-6`, { fontFamily: "ShantellBold" }]}>
            Settings
          </Text>
        </View>
        <TouchableOpacity
          style={tw``}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="cart" size={32} color="#fff" />
        </TouchableOpacity>

        <Badge
          value={cartItem.count}
          status="warning"
          containerStyle={{
            position: "absolute",
            top: 2,
            right: 15,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          //justifyContent: "center",
          backgroundColor: "#d6d6d6",
        }}
      >
        <View style={styles.item}>
          <Text style={{ textAlignVertical: "center" }}>Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        <View style={styles.item}>
          <Text>Language</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginRight: 8, textAlignVertical: "center" }}>
              {language}
            </Text>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <Text>Payment Method</Text>
          <TouchableOpacity>
            <Text>{paymentMethod}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text>Address Book</Text>
          <TouchableOpacity>
            <Text>{addressBook.length} Addresses</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <Text>Privacy and Security</Text>
          <TouchableOpacity onPress={() => alert("Privacy and Security")}>
            <Text>View Policy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Text>App Theme</Text>
          <TouchableOpacity>
            <Text>{appTheme}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw`bg-orange-500 w-70% mt-12 py-2 rounded-lg `}
          onPress={handleSignOut}
        >
          <View>
            <Text style={tw`text-4 text-center font-bold`}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "100%",
    borderBottomColor: "#0003",
    borderBottomWidth: 1,
    padding: 8,
    marginBottom: 4,
  },
});
