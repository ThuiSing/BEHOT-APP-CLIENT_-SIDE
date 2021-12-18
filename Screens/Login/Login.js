import React, { useRef, useState } from "react";
import { TouchableHighlight, View } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { useSelector } from "react-redux";
import { Link } from "react-router-native";
import Profile from "../Home/Profile/Profile";
import useAuth from "../Hooks/UseAuth";

const Login = () => {
  const { user, LoginEmail, logInError, setLogInError } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  // const [error, setError] = useState("");
  // const { user } = useSelector((state) => state.firebase.firebase());
  // console.log(logInError);
  const getValue = (e) => {
    setEmail(e);
  };
  const getValuePass = (e) => {
    setPass(e);
  };

  const handlePRess = () => {
    if (email === "" || pass === "") {
      setLogInError("enter Fields properly !");
    } else {
      LoginEmail(email, pass);
    }
  };
  return (
    <View
      style={{
        paddingHorizontal: 10,
        justifyContent: "center",
        height: "85%",
      }}
    >
      <Text h4 style={{ marginBottom: 20 }}>
        Please Log in here !
      </Text>
      <Input onChangeText={getValue} placeholder="Enter name" />
      <Input
        onChangeText={getValuePass}
        placeholder="Enter password"
        secureTextEntry
      />
      <Text
        style={{
          color: "red",
          fontSize: 17,
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        {logInError}
      </Text>
      <Button onPress={handlePRess} title="login" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 17 }}>Don't Have any Account?</Text>
        <TouchableHighlight style={{ marginLeft: 5 }}>
          <Link to="/register">
            <Text style={{ color: "blue", fontSize: 17, fontWeight: "bold" }}>
              Register
            </Text>
          </Link>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Login;
