import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Badge } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from "../slices/cartSlice";
import type { RootState } from "../../store";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import {
  query,
  collection,
  getDocs,
  getFirestore,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "../../config/firebase";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { string } from "prop-types";
//import { FlatList } from "react-native-gesture-handler";

const OrderHistoryScreen = () => {
  const app = initializeApp(firebaseConfig);
  // //const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const cartItem = useSelector((state: RootState) => state.cart);
  const navigation: any = useNavigation();
  const [userId, setUserId] = useState<string | null>("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const uid = await SecureStore.getItemAsync("userId");
        setUserId(uid);
        console.log(uid);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserId();
  }, []);
  interface Orders {
    timestamp: any;
    id: string;
    image: string;
    title: string;
    description: string;
    price: number;
    rating: [];
    category: string;
    uuid: string;
    quantity: number;
    key: string;
  }

  const [orders, setOrders] = useState<Orders[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [db, userId]);
  async function fetchOrders() {
    const newOrders: Orders[] = [];
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      newOrders.push(doc.data() as Orders);
    });
    setOrders(newOrders);
    //console.log("length of array is:", orders.length);
    //console.log(orders);
    setIsLoading(false);
  }

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch the latest data
    fetchOrders();
    setRefreshing(false);
  };
  //console.log("array:", orders);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f77b0f" />
    </View>
  ) : (
    <>
      <StatusBar backgroundColor="#f97316" barStyle="light-content" />
      <View style={tw` mb-0 flex-row bg-orange-500`}>
        <View style={tw`mr-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View style={tw`rounded-md border-1   w-64`}>
          <Text style={[tw`text-white text-6`, { fontFamily: "ShantellBold" }]}>
            Orders
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

      <View style={styles.container}>
        <FlatList
          data={orders}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={(itemData) => {
            return (
              <View>
                <View
                  style={tw`flex-row border-2  border-gray-100 bg-white   `}
                >
                  <View style={tw`mx-2 justify-center `}>
                    <Avatar
                      size={48}
                      source={{ uri: itemData.item.image }}
                      rounded
                    />
                  </View>
                  <View style={tw`my-2 w-72`}>
                    <Text style={tw`pr-10`}>{itemData.item.title}</Text>
                    <Text style={tw`font-bold`}>
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(itemData.item.price)}
                    </Text>
                    <Text>Quantity: {itemData.item.quantity}</Text>
                    <Text>
                      {itemData.item.timestamp
                        .toDate()
                        .toLocaleString("en-US", options)}{" "}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.key.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    //borderWidth: 2,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  order: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
});

export default OrderHistoryScreen;
