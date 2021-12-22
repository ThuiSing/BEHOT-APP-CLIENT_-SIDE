import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { Link } from "react-router-native";
import Profile from "../../Home/Profile/Profile";
import useAuth from "../../Hooks/UseAuth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { user, emailRegister, RegisterError, setRegisterError } = useAuth();

  const getValue = (e) => {
    setEmail(e);
  };
  const getValueName = (e) => {
    setName(e);
  };
  const getValuePass = (e) => {
    setPass(e);
  };
  const handleRegister = () => {
    if (name === "" || email === "" || pass === "") {
      setRegisterError("Please fill up all fields properly !");
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email)) {
        emailRegister(email, pass, name);
        // console.log("success");
      } else {
        setRegisterError("Please input a validate email !");
      }
    }
  };
  return (
    <>
      {user.email ? (
        <Profile />
      ) : (
        <View
          style={{
            height: "85%",
            paddingHorizontal: 10,
            justifyContent: "center",
          }}
        >
          <Text h4 style={{ marginBottom: 20 }}>
            Register Here !
          </Text>
          <Input onChangeText={getValueName} placeholder="Enter name" />
          <Input onChangeText={getValue} placeholder="Enter email" />
          <Input
            onChangeText={getValuePass}
            placeholder="Enter password"
            secureTextEntry
          />
          <Text
            style={{
              color: "red",
              marginBottom: 15,
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            {RegisterError}
          </Text>
          <Button onPress={handleRegister} title="Register" />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 17 }}>Already Have an Account?</Text>
            <View>
              <Link style={{ marginLeft: 5 }} to="/login">
                <Text
                  style={{ color: "blue", fontSize: 17, fontWeight: "bold" }}
                >
                  Login now
                </Text>
              </Link>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Register;
