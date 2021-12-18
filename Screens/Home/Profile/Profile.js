import React from "react";
import { Text, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Button, Image } from "react-native-elements";
import { Link } from "react-router-native";
import useAuth from "../../Hooks/UseAuth";
import Login from "../../Login/Login";

const Profile = () => {
  const { user, loggedOut } = useAuth();

  const handleLogout = () => {
    Alert.alert("", "Are you sure to logout ? ", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => loggedOut() },
    ]);
  };
  return (
    <>
      {user?.email ? (
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Image
            source={{
              uri: user?.photoURL
                ? user.photoURL
                : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
            }}
            style={{ width: 100, height: 100, marginBottom: 10 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
            }}
          >
            Name:
            <Text style={{ textTransform: "uppercase" }}>
              {user?.displayName}
            </Text>
          </Text>
          <Text style={{ fontSize: 17, marginVertical: 10 }}>
            Email : {user?.email}
          </Text>
          <TouchableOpacity>
            <Link style={styles.button} to="/OrderedItems">
              <Text style={{ color: "#f7ead1" }}>My Orders</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={{ color: "#f7ead1" }}>Log out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    backgroundColor: "#412130",
    borderRadius: 3,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
});
