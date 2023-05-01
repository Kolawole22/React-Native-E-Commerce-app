import React, { useRef, useState } from "react";
import { Paystack } from "react-native-paystack-webview";
import { TouchableOpacity, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import { Modal, StyleSheet } from "react-native";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { clearCart } from "../slices/cartSlice";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../../store";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Items } from "../../utils/hooks/useItemData";

const OrderScreen = () => {
  const app = initializeApp(firebaseConfig);
  // //const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const navigation: any = useNavigation();
  const cartItems = useSelector((state: RootState) => state.cart);
  const amount =
    cartItems.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    ) + 200;
  const dispatch = useDispatch();

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [transactionData, setTransactionData] = useState<any>({});
  //const [reference, setReference] = useState("");

  const { user, isLoaded } = useAuthentication();
  let userId: string | undefined;
  if (isLoaded) {
    userId = user?.uid;
  }

  const {
    message = "",
    reference = "",
    status = "",
    trans = "",
    transaction = "",
    trxref = "",
  } = transactionData?.transactionRef || {};

  // interface ItemsToPush extends Items {
  //   userID: string;
  // }

  const handlePaymentSuccess = (res: any) => {
    // console.log("Payment was successful!");
    // console.log(res);

    setTransactionData(res.data);

    setSuccessModalVisible(true);
    cartItems.items.forEach(async (item) => {
      await addDoc(collection(db, "orders"), {
        ...item,
        timestamp: serverTimestamp(),
        key: Math.random().toString(36).substring(2),
      });
      console.log(`${item.title} added to menu`);
      dispatch(clearCart());
    });
    navigation.navigate("home");
  };

  const handlePaymentFailure = (res: any) => {
    // console.log("Payment was not successful!");
    // console.log(res);
    navigation.navigate("Cart");
  };
  const options = {
    showAlert: true, // display the alert message until the user dismisses it manually
  };

  const key = Constants.manifest?.extra?.payStackKey;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Paystack
        paystackKey={key}
        activityIndicatorColor="#f98312"
        onCancel={(res) => {
          handlePaymentFailure(res);
        }}
        onSuccess={(res) => {
          handlePaymentSuccess(res);
        }}
        billingEmail="paystackwebview@something.com"
        amount={amount}
        autoStart={true}
        channels={["bank", "card", "ussd", "qr", "mobile_money"]}
        //handleWebViewMessage={handleWebViewMessage}
        //options={options}
      />
      <Modal visible={successModalVisible}>
        <View style={styles.container}>
          <Text style={styles.title}>Payment Successful!</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.value}>{message}</Text>
            <Ionicons name="checkmark" size={32} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Reference:</Text>
            <Text style={styles.value}>{reference}</Text>
          </View>
          <View>
            <Text style={styles.value}>Your Order is on its way</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("HomeTab")}
            >
              <Text style={styles.ButtonText}>Finished</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    alignItems: "center",
  },
  value: {
    fontSize: 18,
    color: "#666",
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 24,
    marginTop: 24,
    paddingVertical: 8,
  },
  ButtonText: {
    textAlign: "center",
  },
});

export default OrderScreen;
