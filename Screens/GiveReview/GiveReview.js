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
import { AntDesign } from "@expo/vector-icons";
import useAuth from "../Hooks/UseAuth";
import axios from "axios";

const GiveReview = () => {
  const { user } = useAuth();
  const [review, setReview] = useState({
    name: "",
    companyName: "",
    email: user?.email,
    reviewText: "",
  });
  const [loader, setLoader] = useState(false);
  const getValue = (e, InputName) => {
    const newReview = { ...review };
    newReview[InputName] = e;
    setReview(newReview);
  };
  const handleSubmit = () => {
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
            .post(`https://fast-bayou-02347.herokuapp.com/reviews`, review)
            .then((res) => {
              if (res.data.insertedId) {
                Alert.alert("", "Review Done");
              }
            })
            .finally(() => setLoader(false));
        },
      },
    ]);
  };

  return (
    <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 30 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Give you Review :
      </Text>
      <TextInput
        onChangeText={(e) => getValue(e, "name")}
        style={styles.inputBox}
        placeholder="Your Name"
      />
      <TextInput
        onChangeText={(e) => getValue(e, "companyName")}
        style={styles.inputBox}
        placeholder="Your Company Name"
      />
      <TextInput
        defaultValue={user.email}
        style={styles.inputBox}
        placeholder="Your email"
        editable={false}
        selectTextOnFocus={false}
      />
      <TextInput
        onChangeText={(e) => getValue(e, "reviewText")}
        style={[styles.inputBox, { minHeight: 200 }]}
        placeholder="Your valuable Review..."
        multiline={true}
      />
      {loader ? (
        <View style={styles.reviewBtn}>
          <Text>Loading....</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handleSubmit} style={styles.reviewBtn}>
          <Text>Submit Review</Text>
          <AntDesign name="check" size={24} color="black" />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default GiveReview;

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
