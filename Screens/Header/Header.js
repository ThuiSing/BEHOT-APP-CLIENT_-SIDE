import React from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { useNavigate } from "react-router-native";

const Header = () => {
  const navigate = useNavigate();
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
        onPress={() => navigate("/")}
        source={require("../../assets/logo2.png")}
        style={{ width: 127, height: 45 }}
      />
    </View>
  );
};

export default Header;
