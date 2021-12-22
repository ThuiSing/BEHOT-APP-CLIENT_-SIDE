import React from "react";
import { Text, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import { Link } from "react-router-native";
import useAuth from "../../Hooks/UseAuth";
import Login from "../../Login/Login";

const Profile = () => {
  const { isAdmin, user, loggedOut } = useAuth();

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
          <TouchableOpacity style={{ marginTop: 25 }}>
            <Link style={styles.button} to="/OrderedItems">
              <Text style={{ color: "#000", fontWeight: "700" }}>
                My Orders
              </Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity>
            <Link style={styles.button} to="/setReview">
              <Text style={{ color: "#000", fontWeight: "700" }}>
                Review website
              </Text>
            </Link>
          </TouchableOpacity>
          {isAdmin && (
            <TouchableOpacity>
              <Link style={styles.button} to="/add-product">
                <Text style={{ color: "#000", fontWeight: "700" }}>
                  Add Product
                </Text>
              </Link>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={{ color: "#000", fontWeight: "700" }}>Log out</Text>
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
    backgroundColor: "#d9d9d9",
    borderRadius: 3,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
});
