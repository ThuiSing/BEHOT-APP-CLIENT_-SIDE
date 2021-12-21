import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Image, Text } from "react-native-elements";
import useAuth from "../Hooks/UseAuth";

const OrderedItem = () => {
  const { user } = useAuth();
  const [orderedItems, setOrderedItems] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    axios
      .get(`https://fast-bayou-02347.herokuapp.com/orderedItems/${user?.email}`)
      .then((res) => setOrderedItems(res.data))
      .finally(() => setLoader(false));
  }, [user.email]);

  const handleCancel = (id) => {
    Alert.alert("Confirm Cancel", "Are tou sure to cancel this order", [
      {
        text: "Cancel",
        onPress: () => console.log(),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () =>
          axios
            .delete(`https://fast-bayou-02347.herokuapp.com/orderedItems/${id}`)
            .then((res) => {
              if (res.data.deletedCount > 0) {
                const existedItems = orderedItems.filter(
                  (item) => item._id !== id
                );
                setOrderedItems(existedItems);
                Alert.alert("", "Successfully Canceled order !");
              }
            }),
      },
    ]);
  };

  return (
    <>
      {loader ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <ScrollView style={{ paddingHorizontal: 15 }}>
          {orderedItems.length <= 0 ? (
            <View
              style={{
                height: "90%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 20,
                }}
              >
                Sorry, No Ordered Found !
              </Text>
            </View>
          ) : (
            <Text h4>Order Items :</Text>
          )}
          {orderedItems.map((item) => (
            <View
              key={item._id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: "black",
                borderWidth: 1,
                marginVertical: 5,
                padding: 8,
                borderRadius: 5,
              }}
            >
              <Image
                style={{ width: 70, height: 70, marginRight: 10 }}
                resizeMode="cover"
                source={{ uri: item.img }}
              />
              <View style={{ width: "80%" }}>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>
                  {item.itemName}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  Status : <Text style={{ color: "green" }}>{item.status}</Text>
                </Text>
                <Text style={{ fontSize: 15, marginVertical: 4 }}>
                  Quantity : {item.quantity}
                </Text>
                <Text>Price : ${item.price * item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleCancel(item._id)}
                  style={{
                    backgroundColor: "pink",
                    width: 100,
                    alignItems: "center",
                    padding: 3,
                    marginTop: 6,
                  }}
                >
                  <Text>Cancel Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default OrderedItem;
