import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { emptyCart, removeFromCart } from "../../Redux/Slices/HoodiesSlice";

const Cart = () => {
  const { cart } = useSelector((state) => state.hoodie);

  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleAllOrders = (items) => {
    dispatch(emptyCart());
  };
  return (
    <ScrollView style={{ paddingHorizontal: 15 }}>
      <Text h4>You Cart Items : </Text>

      {cart.length >= 1 &&
        cart.map((item, i) => {
          return (
            <View key={i} style={styles.box}>
              <Image
                source={{ uri: item?.img }}
                style={{ width: 50, height: 50 }}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: "600" }}>
                  {item.itemName}
                </Text>
                <Text style={{ fontSize: 16 }}>Quantity : {item.quantity}</Text>
                <Text style={{ fontSize: 16 }}>
                  Price : {item.quantity * item.price}
                </Text>
              </View>
              <Text onPress={() => handleRemove(item._id)}>
                <Entypo name="circle-with-cross" size={24} color="black" />
              </Text>
            </View>
          );
        })}

      {cart.length <= 0 && (
        <View>
          <Text style={{ color: "red", marginTop: 20, fontSize: 17 }}>
            Sorry, You didn't add any item on cart
          </Text>
        </View>
      )}
      {cart.length >= 1 && (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <TouchableOpacity
            onPress={() => handleAllOrders(cart)}
            style={{
              backgroundColor: "#412130",
              padding: 6,
              width: 120,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#f7ead1" }}>Order All Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Cart;
const styles = StyleSheet.create({
  box: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#00000f",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
