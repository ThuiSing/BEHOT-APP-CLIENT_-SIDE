import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

const ContactUs = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 30 }}>
        Feel Free to contact us
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "50%" }}>
          <Input style={[styles.inputBox]} placeholder="Name" />
        </View>
        <View style={{ width: "50%" }}>
          <Input placeholder="Email" style={[styles.inputBox]} />
        </View>
      </View>
      <Input
        placeholder="Enter your Message"
        style={[styles.inputBox, { minHeight: 150 }]}
        multiline={true}
      />
      <TouchableOpacity style={styles.Btn}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Send</Text>
        <FontAwesome5
          name="arrow-right"
          size={20}
          style={{ marginLeft: 10 }}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    width: "100%",
  },
  Btn: {
    flexDirection: "row",
    backgroundColor: "gray",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    marginVertical: 20,
    borderRadius: 5,
  },
});
