import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import useAuth from "../../../Hooks/UseAuth";

const AddProducts = () => {
  const { user } = useAuth();
  const [itemDetails, setItemDetails] = useState({
    itemName: "",

    img: "",
    rating: "",
    description: "",
  });
  const [loader, setLoader] = useState(false);
  const getValue = (e, InputName) => {
    const newReview = { ...itemDetails };
    newReview[InputName] = e;
    setItemDetails(newReview);
  };
  const handleSubmit = () => {
    const newDetails = { ...itemDetails };
    newDetails.description = newDetails.description.split(".");
    if (isNaN(newDetails.price)) {
      Alert.alert("", "Price should be a number value ");
    } else {
      Alert.alert("Confirm Submit", "Are you to Submit Review ? ", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Submit",
          onPress: () => {
            setLoader(true);
            axios
              .post(
                "https://fast-bayou-02347.herokuapp.com/hoodies",
                newDetails
              )
              .then((res) => {
                if (res.data.insertedId) {
                  Alert.alert("", "successfully Added");
                }
              })
              .finally(() => setLoader(false));
          },
        },
      ]);
    }
  };

  return (
    <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 30 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Give you Review :
      </Text>
      <TextInput
        onChangeText={(e) => getValue(e, "itemName")}
        style={styles.inputBox}
        placeholder="Item Name"
      />
      <TextInput
        onChangeText={(e) => getValue(e, "price")}
        style={styles.inputBox}
        placeholder="Item Price"
      />
      <TextInput
        onChangeText={(e) => getValue(e, "img")}
        style={styles.inputBox}
        placeholder="Item Image URL"
      />
      <TextInput
        onChangeText={(e) => getValue(e, "rating")}
        style={styles.inputBox}
        placeholder="Item Rating"
      />
      <TextInput
        onChangeText={(e) => getValue(e, "description")}
        style={[styles.inputBox, { minHeight: 200 }]}
        placeholder="Descriptions"
        multiline={true}
      />
      {loader ? (
        <View style={styles.reviewBtn}>
          <Text>Loading....</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handleSubmit} style={styles.reviewBtn}>
          <Text>Add Item</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
export default AddProducts;

const styles = StyleSheet.create({
  inputBox: {
    padding: 10,
    borderRightColor: "gray",
    borderWidth: 1,
    marginTop: 15,
    fontSize: 15,
    color: "#000",
  },
  reviewBtn: {
    flexDirection: "row",
    backgroundColor: "gray",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 25,
    borderRadius: 5,
  },
});
