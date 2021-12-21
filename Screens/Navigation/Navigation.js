import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Link } from "react-router-native";
import { StyleSheet } from "react-native";

const Navigation = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <View
      style={{
        backgroundColor: "#fffffe",
        position: "absolute",
        backgroundColor: "#404040",
        width: "100%",
        height: 50,
        zIndex: 50,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Link style={styles.navigationBtn} to="/">
        <Text>
          <Entypo name="home" size={24} color="#fff" />
        </Text>
      </Link>
      <Link style={styles.navigationBtn} to="/cart">
        <Text>
          <AntDesign name="shoppingcart" size={24} color="#fff" />
        </Text>
      </Link>
      <Link style={styles.navigationBtn} to="/profile">
        <Text>
          <FontAwesome name="user-circle-o" size={24} color="#fff" />
        </Text>
      </Link>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  navigationBtn: {
    flexGrow: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
