import React from "react";
import { ScrollView, Text, View } from "react-native";
import ContactUs from "../ContactUs/ContactUs";
import Review from "../Review/Review";
import Banner from "./Banner/Banner";
import Hoodies from "./Hoddies/Hoodies";

const Home = () => {
  return (
    <ScrollView style={{ marginBottom: 50 }}>
      <Banner />
      <Hoodies showAll={false} />
      <Review />
      <ContactUs />
    </ScrollView>
  );
};
export default Home;
