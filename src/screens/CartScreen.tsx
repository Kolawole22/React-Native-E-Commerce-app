import { Text, View, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import { Avatar } from "@rneui/base";
import { FlatList } from "react-native-gesture-handler";
import {
  addItem,
  subtractItem,
  removeItem,
  clearCart,
} from "../slices/cartSlice";
import { RootState } from "../../store";
import { Items, useItemData } from "../../utils/hooks/useItemData";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = () => {
  const { storeItems } = useItemData();
  const navigation: any = useNavigation();
  const cartItem = useSelector((state: RootState) => state.cart);
  const list = cartItem.items;
  const dispatch = useDispatch();
  const handleAddToCart = (item: Items) => {
    dispatch(addItem({ item, quantity: 1 }));
    //console.log(cartItem);
  };
  const handleSubtractItem = (item: Items) => {
    dispatch(subtractItem({ item, quantity: 1 }));
    //console.log(cartItem);
  };

  const handleRemoveFromCart = (item: Items) => {
    dispatch(removeItem({ item }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  //console.log("length:", list.length);

  //console.log(cartItem.items);
  return (
    <SafeAreaView style={tw`bg-gray-200 flex-1 `}>
      {list.length > 0 ? (
        <>
          <View style={tw` mb-0 flex-row bg-orange-500`}>
            <View style={tw`mr-4`}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={32} color="white" />
              </TouchableOpacity>
            </View>
            <View style={tw`rounded-md border-1   w-64`}>
              <Text
                style={[tw`text-white text-6`, { fontFamily: "ShantellBold" }]}
              >
                Cart
              </Text>
            </View>
            <TouchableOpacity style={tw``} onPress={() => handleClearCart()}>
              <Ionicons name="close-circle-outline" size={32} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={tw`flex-10`}>
            <View style={tw`flex-11`}>
              <FlatList
                data={list}
                renderItem={(itemData) => {
                  return (
                    <View
                      style={tw`flex-row border-2  border-gray-100 bg-white `}
                    >
                      <View style={tw`mx-2 justify-center `}>
                        <Avatar
                          size={48}
                          source={{ uri: itemData.item.image }}
                          rounded
                        />
                      </View>
                      <View style={tw`my-2 w-72`}>
                        <Text>{itemData.item.title}</Text>
                        <Text style={tw`font-bold`}>
                          {itemData.item.quantity}
                          {" * "}
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          }).format(itemData.item.price)}
                        </Text>
                        <View style={tw`flex-row`}>
                          <TouchableOpacity
                            style={tw`mr-32 mt-4`}
                            onPress={() => handleRemoveFromCart(itemData.item)}
                          >
                            <Text style={tw`font-bold`}>Remove</Text>
                          </TouchableOpacity>
                          {itemData.item.quantity === 1 ? (
                            <View style={tw`mr-4`}>
                              <Text style={tw`text-6 font-bold `}>-</Text>
                            </View>
                          ) : (
                            <TouchableOpacity
                              style={tw`mr-4`}
                              onPress={() => handleSubtractItem(itemData.item)}
                            >
                              <Text style={tw`text-6 font-bold`}>-</Text>
                            </TouchableOpacity>
                          )}

                          <View
                            style={tw`mr-4 justify-center bg-gray-200 rounded-full px-3`}
                          >
                            <Text style={tw`text-4 font-bold `}>
                              {itemData.item.quantity}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => handleAddToCart(itemData.item)}
                          >
                            <Text style={tw`text-6 font-bold`}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <View style={tw`border-t-2 mt-0 justify-start flex-2`}>
              <Text style={tw`ml-8`}>
                Sub-Total:{" "}
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(cartItem.totalPrice)}
              </Text>
              <Text style={tw`ml-8`}>
                Delivery Charge:{" "}
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(5)}
              </Text>
              <Text style={tw`ml-8`}>
                Total:{" "}
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(cartItem.totalPrice + 200)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={tw`items-center `}
            onPress={() => navigation.navigate("Orders")}
          >
            <View
              style={tw`rounded-lg bg-orange-500 py-2 w-72 items-center mb-4 `}
            >
              <Text>Checkout</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={tw` mb-0 flex-row bg-orange-500`}>
            <View style={tw`mr-4`}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={32} color="white" />
              </TouchableOpacity>
            </View>
            <View style={tw`rounded-md border-1   w-64`}>
              <Text
                style={[tw`text-white text-6`, { fontFamily: "ShantellBold" }]}
              >
                Cart
              </Text>
            </View>
          </View>
          <View style={tw`justify-center items-center flex-1`}>
            <Text>Add items to the cart</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
export default memo(CartScreen);

//const styles = StyleSheet.create({});
