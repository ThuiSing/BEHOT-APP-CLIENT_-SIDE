import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const Review = () => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios.get("http://192.168.0.107:5000/reviews").then((res) => {
        setReview(res.data);
      });
    };
    fetchData();
  }, []);
  return (
    <View style={styles.reviewContainer}>
      <View>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          Our Customers Reviews
        </Text>
      </View>
      <Carousel
        layout={"default"}
        data={review}
        sliderWidth={400}
        itemWidth={windowWidth - 10}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.reviewBox}>
            <View style={{ position: "relative", paddingVertical: 20 }}>
              <FontAwesome
                style={{ position: "absolute", opacity: 0.3, top: 0 }}
                name="quote-left"
                size={50}
                color="black"
              />
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: 1,
                  lineHeight: 20,
                  color: "#000",
                }}
              >
                {item.reviewText}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={{
                  uri: item.img
                    ? item.img
                    : "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#000",
                }}
              >
                {item.name} | {item.companyName}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  reviewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  reviewBox: {
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    minHeight: 300,
    padding: 20,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
