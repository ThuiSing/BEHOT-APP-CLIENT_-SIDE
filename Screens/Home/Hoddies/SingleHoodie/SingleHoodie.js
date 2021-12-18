import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-native";
import { addToCart } from "../../../../Redux/Slices/HoodiesSlice";
import useAuth from "../../../Hooks/UseAuth";

const SingleHoodie = () => {
  const { id } = useParams();
  const [hoodie, setHoodie] = useState({});
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuth();
  // console.log(id);

  useEffect(() => {
    fetch(`https://fast-bayou-02347.herokuapp.com/hoodies/${id}`)
      .then((response) => response.json())
      .then((json) => setHoodie(json))
      .catch((error) => console.error(error))
      .finally(() => setLoader(false));
  }, []);

  const handleOrder = (item) => {
    item.email = user.email;

    {
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
                    item
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

  const handleCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <ScrollView
      style={{
        paddingHorizontal: 15,
        marginBottom: 50,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: hoodie?.img }}
          style={{ width: 300, height: 300 }}
        />
      </View>
      <View style={{ paddingVertical: 15 }}>
        <Text h4>{hoodie?.itemName}</Text>
        <View style={{ marginVertical: 15 }}>
          {hoodie.description &&
            hoodie?.description.map((desc, indx) => (
              <View
                key={indx}
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  alignItems: "center",
                }}
              >
                <Text>{"\u2022"}</Text>
                <Text style={{ flex: 1, paddingLeft: 5, fontSize: 16 }}>
                  {desc}
                </Text>
              </View>
            ))}
        </View>
        <Text h4>Price: ${hoodie?.price}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => handleOrder(hoodie)}>
          <View style={styles.singleItemBtn}>
            <Text style={{ fontSize: 17 }}>Order Now</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCart(hoodie)}
          style={styles.singleItemBtn}
        >
          <Text style={{ fontSize: 17 }}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SingleHoodie;

const styles = StyleSheet.create({
  singleItemBtn: {
    backgroundColor: "pink",
    padding: 14,
    borderRadius: 5,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
