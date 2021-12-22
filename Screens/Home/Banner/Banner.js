import React from "react";
import Carousel from "react-native-banner-carousel";
import { Image, View, Dimensions } from "react-native";

const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 300;
const images = [
  "https://i.ibb.co/nmjwVKZ/760fcfee33d8eefcd68145cf04937662.png",
  "https://i.ibb.co/zbZmnX7/infinite-hoodie-6-55209-1606212683.png",
  "https://i.ibb.co/py0FfyY/images.png",
  "https://i.ibb.co/n3gPYLz/Graffiti-Hoodie-Banner-1.png",
];
const Banner = () => {
  return (
    <View>
      <Carousel
        autoplay={false}
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={BannerWidth}
        showsPageIndicator={false}
      >
        {images.map((image, index) => (
          <View key={index}>
            <Image
              style={{ width: BannerWidth, height: BannerHeight }}
              source={{ uri: image }}
            />
          </View>
        ))}
      </Carousel>
    </View>
  );
};

export default Banner;
