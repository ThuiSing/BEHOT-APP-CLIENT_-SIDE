import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Input, Button } from "react-native-elements";
import useAuth from "../../Hooks/UseAuth";
import { Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const PlaceOrder = ({
  popupModal,
  setPopupModal,
  hoodie,
  fadeAnim,
  fadeOut,
}) => {
  const { user } = useAuth();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [orderItem, setOrderItem] = useState({
    userName: "",
    email: user?.email ? user.email : "",
    userAddress: "",
    userNumber: Number,
    quantity: "",
  });
  const [error, setError] = useState("");
  const getInputValue = (e, inputName) => {
    const newItem = { ...orderItem };
    newItem[inputName] = e;
    setOrderItem(newItem);
  };
  const handleOrder = () => {
    const newItem = { ...orderItem };
    newItem._id = hoodie._id;
    newItem.description = hoodie.description;
    newItem.img = hoodie.img;
    newItem.price = hoodie.price;
    newItem.itemName = hoodie.itemName;
    if (isNaN(newItem.userNumber) || isNaN(newItem.quantity)) {
      setError("Enter a valid Number value");
    } else {
      setError("");
      user.email
        ? Alert.alert("Confirm Purchase", "Are you to purchase this Item ? ", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Purchase",
              onPress: () =>
                axios
                  .post(
                    `https://fast-bayou-02347.herokuapp.com/orderedItems`,
                    newItem
                  )
                  .then((res) => {
                    console.log(res.data);
                    if (
                      res.data.modifiedCount > 0 ||
                      res.data.upsertedCount > 0
                    ) {
                      Alert.alert("", "Successfully Ordered");
                    }
                  }),
            },
          ])
        : Alert.alert("", "Log In First");
    }
  };
  return (
    <Animated.View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "white",
        zIndex: 60,
        justifyContent: "center",
        paddingHorizontal: 15,
        opacity: fadeAnim,
        marginTop: 25,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          fadeOut();
          setTimeout(() => {
            setPopupModal(false);
          }, 2500);
        }}
        style={{
          position: "absolute",
          right: 10,
          top: 40,
        }}
      >
        <Entypo name="squared-cross" size={30} color="black" />
      </TouchableOpacity>
      <View>
        <Text style={styles.label}>Name</Text>
        <Input
          onChangeText={(e) => getInputValue(e, "userName")}
          //   name="userName"
          placeholder="Enter Name"
        />
        <Text style={styles.label}>Email</Text>
        <Input
          onChangeText={(e) => getInputValue(e, "email")}
          defaultValue={user?.email}
          placeholder="Enter Email"
          disabled
        />
        <Text style={styles.label}>Address</Text>
        <Input
          onChangeText={(e) => getInputValue(e, "userAddress")}
          name="userAddress"
          placeholder="Enter Address"
        />
        <Text style={styles.label}>Number</Text>
        <Input
          onChangeText={(e) => getInputValue(e, "userNumber")}
          name="userNumber"
          placeholder="Enter mobile Number"
        />
        <Text
          style={{
            color: "red",
            marginBottom: error === "" ? 0 : 10,
            marginTop: error === "" ? 0 : -15,
            paddingHorizontal: 8,
          }}
        >
          {error}
        </Text>
        <Text style={styles.label}>Quantity</Text>
        <Input
          onChangeText={(e) => getInputValue(e, "quantity")}
          name="quantity"
          placeholder="Enter Quantity"
        />
        <Text
          style={{
            color: "red",
            marginBottom: error === "" ? 0 : 10,
            marginTop: error === "" ? 0 : -15,
            paddingHorizontal: 8,
          }}
        >
          {error}
        </Text>
        <Text style={styles.label}>Item Name</Text>
        <Input
          defaultValue={hoodie?.itemName}
          disabled
          placeholder="Ordered item"
        />

        <Button onPress={handleOrder} title="Order Now" />
      </View>
    </Animated.View>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 8,
    marginBottom: 3,
    fontSize: 15,
  },
});
