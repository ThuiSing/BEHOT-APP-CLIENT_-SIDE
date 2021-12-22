import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Card, Rating, Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "react-router-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchHoodiesData } from "../../../Redux/Slices/HoodiesSlice";
import { EvilIcons } from "@expo/vector-icons";

const Hoodies = ({ showAll }) => {
  const { hoodies } = useSelector((state) => state.hoodie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHoodiesData());
  }, []);
  return (
    <ScrollView style={{ zIndex: 1 }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Our Items</Text>
      </View>
      <View>
        {(showAll ? hoodies : hoodies.slice(0, 4)).map((item) => (
          <Card key={item._id}>
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
                    backgroundColor: "gray",
                    padding: 8,
                  }}
                >
                  <AntDesign name="arrowright" size={24} color="#fff" />
                  <Text style={{ marginLeft: 5, color: "#fff" }}>
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
                  backgroundColor: "#dfdfdf",
                  padding: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#000" }}>Show More hoodies</Text>
                <EvilIcons name="arrow-right" size={24} color="#000" />
              </View>
            </Link>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Hoodies;
