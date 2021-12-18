import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Card, Rating, Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Link, Outlet } from "react-router-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchHoodiesData } from "../../../Redux/Slices/HoodiesSlice";
import { EvilIcons } from "@expo/vector-icons";

const Hoodies = ({ showAll }) => {
  const { hoodies } = useSelector((state) => state.hoodie);
  const user = useSelector((state) => console.log(state.firebase));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHoodiesData());
  }, []);
  return (
    <ScrollView style={{ zIndex: 1, marginBottom: 50 }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text h3>Our Items</Text>
      </View>
      <View>
        {(showAll ? hoodies : hoodies.slice(0, 4)).map((item) => (
          <Card key={item.id}>
            <Card.Title>{item.itemName}</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ height: 300 }}
              source={{
                uri: item.img,
              }}
            />
            <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: "800" }}>
              Price : {item.price}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>Rating : </Text>
              <Rating
                ratingCount={5}
                startingValue={item?.rating ? item.rating : 1}
                imageSize={25}
                readonly
              />
            </View>
            <View>
              <Link to={`/hoodies/${item._id}`}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#412130",
                    padding: 8,
                  }}
                >
                  <AntDesign name="arrowright" size={24} color="#f7ead1" />
                  <Text style={{ marginLeft: 5, color: "#f7ead1" }}>
                    Show Details
                  </Text>
                </View>
              </Link>
            </View>
          </Card>
        ))}
      </View>
      {showAll || (
        <View
          style={{
            paddingHorizontal: 10,
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity>
            <Link to="/hoodies">
              <View
                style={{
                  backgroundColor: "#f7ead1",
                  padding: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#412120" }}>Show More hoodies</Text>
                <EvilIcons name="arrow-right" size={24} color="#412120" />
              </View>
            </Link>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Hoodies;
