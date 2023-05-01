import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Items } from "../../utils/hooks/useItemData";
import { useItemData } from "../../utils/hooks/useItemData";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  removeItem,
  updateQuantity,
  subtractItem,
} from "../slices/cartSlice";
import { RootState } from "../../store";
import { SearchBar } from "@rneui/themed";

interface ItemProp {
  itemProp: string;
}
const ItemsComponent = ({ itemProp }: ItemProp) => {
  const navigation = useNavigation();
  const { storeItems } = useItemData();

  const items = storeItems.filter((item) => item.category == itemProp);
  //console.log(fastFood);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredOrders = useMemo(() => {
    return searchQuery
      ? items.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : items;
  }, [searchQuery, items]);

  const cartItem = useSelector((state: RootState) => state.cart);

  //console.log(cartItem);
  //console.log("Total:", cartTotal);
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(
    (item: Items) => {
      dispatch(addItem({ item, quantity: 1 }));
    },
    [dispatch]
  );

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleSubtractItem = (item: Items) => {
    dispatch(subtractItem({ item, quantity: 1 }));
    //console.log(cartItem);
  };

  const handleRemoveFromCart = (item: Items) => {
    dispatch(removeItem({ item, quantity: 1 }));
  };

  const renderItem = useCallback(
    (itemData: any) => (
      <View style={tw`border-b-2 border-gray-400 `}>
        <View style={tw`border-0  my-4  items-center`}>
          <Image
            style={styles.image}
            resizeMethod="resize"
            defaultSource={require("../../assets/empty.png")}
            source={{
              uri: itemData.item.image,
            }}
          />
        </View>
        <View style={tw` ml-4 mb-2`}>
          <Text style={styles.nameText}>{itemData.item.title}</Text>
          <View style={tw`flex-row justify-between `}>
            <Text style={styles.priceText}>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(itemData.item.price)}
            </Text>
            {cartItem.items.find(
              (cartItem) => cartItem.id === itemData.item.id
            ) ? (
              <View style={tw`flex-row justify-between  `}>
                <View style={tw`flex-row justify-between  `}>
                  <TouchableOpacity
                    style={tw`mr-4 ml-8`}
                    onPress={() => handleSubtractItem(itemData.item)}
                  >
                    <Text style={tw`text-5 font-bold`}>-</Text>
                  </TouchableOpacity>

                  <View
                    style={tw`mr-4 justify-center bg-gray-200 rounded-full px-2`}
                  >
                    <Text style={tw`text-4 font-bold`}>
                      {
                        cartItem.items.find(
                          (cartItem) => cartItem.id === itemData.item.id
                        )?.quantity
                      }
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleAddToCart(itemData.item)}
                  >
                    <Text style={tw`text-5 font-bold`}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => handleRemoveFromCart(itemData.item)}
                  style={tw`border-0 mr-4  rounded-md  bg-orange-400 px-4 py-1 ml-4`}
                >
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => handleAddToCart(itemData.item)}
                  style={tw`border-0 mr-4 rounded-md  bg-orange-400 p-1 `}
                >
                  <Text>Add to cart</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    ),
    [cartItem]
  );

  return (
    <View>
      <View style={styles.container}>
        <SearchBar
          containerStyle={tw`justify-center rounded-3xl`}
          placeholder="Search orders..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          platform="ios"
          showCancel={true}
        />

        <View style={tw`bg-white px-6 rounded-lg mb-32 `}>
          <FlatList
            data={filteredOrders}
            showsVerticalScrollIndicator={false}
            windowSize={5}
            initialNumToRender={5}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 180,
    borderRadius: 16,
    resizeMode: "contain",
  },
  nameText: {
    fontSize: 14,
    color: "#f97316",
    fontFamily: "InterBold",
  },
  priceText: {
    fontSize: 14,
    color: "#f97316",
    fontFamily: "InterBold",
    textAlignVertical: "center",
  },
});

export default memo(ItemsComponent);
