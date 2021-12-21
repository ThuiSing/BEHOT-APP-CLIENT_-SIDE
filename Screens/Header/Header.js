import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Image } from "react-native-elements";

const Header = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 2,
      }}
    >
      <Image
        source={require("../../assets/logo2.png")}
        style={{ width: 127, height: 45 }}
      />
    </View>
  );
};

export default Header;
