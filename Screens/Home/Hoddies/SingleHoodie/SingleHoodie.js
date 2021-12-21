import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-native";
import { addToCart } from "../../../../Redux/Slices/HoodiesSlice";
import useAuth from "../../../Hooks/UseAuth";
import PlaceOrder from "../../PlaceOrder/PlaceOrder";

const SingleHoodie = () => {
  const { id } = useParams();
  const [hoodie, setHoodie] = useState({});
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [popupModal, setPopupModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetch(`https://fast-bayou-02347.herokuapp.com/hoodies/${id}`)
      .then((response) => response.json())
      .then((json) => setHoodie(json))
      .catch((error) => console.error(error))
      .finally(() => setLoader(false));
  }, []);

  const handleOrder = (item) => {
    user.email && fadeIn();
    user.email
      ? popupModal
        ? setPopupModal(false)
        : setPopupModal(true)
      : Alert.alert("", "Log In First");
  };

  const handleCart = (item) => {
    dispatch(addToCart(item));
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <ScrollView
        style={{
          paddingHorizontal: 15,
          marginBottom: 50,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: hoodie?.img }}
            style={{ width: 300, height: 300 }}
          />
        </View>
        <View style={{ paddingVertical: 15 }}>
          <Text h4>{hoodie?.itemName}</Text>
          <View style={{ marginVertical: 15 }}>
            {hoodie.description &&
              hoodie?.description.map((desc, indx) => (
                <View
                  key={indx}
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <Text>{"\u2022"}</Text>
                  <Text style={{ flex: 1, paddingLeft: 5, fontSize: 16 }}>
                    {desc}
                  </Text>
                </View>
              ))}
          </View>
          <Text h4>Price: ${hoodie?.price}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => handleOrder(hoodie)}>
            <View style={styles.singleItemBtn}>
              <Text style={{ fontSize: 17 }}>Order Now</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCart(hoodie)}
            style={styles.singleItemBtn}
          >
            <Text style={{ fontSize: 17 }}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {popupModal && (
        <PlaceOrder
          popupModal={popupModal}
          setPopupModal={setPopupModal}
          hoodie={hoodie}
          fadeAnim={fadeAnim}
          fadeOut={fadeOut}
        />
      )}
    </>
  );
};

export default SingleHoodie;

const styles = StyleSheet.create({
  singleItemBtn: {
    backgroundColor: "pink",
    padding: 14,
    borderRadius: 5,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
