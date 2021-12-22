import React from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import Cart from "./Cart/Cart";
import GiveReview from "./GiveReview/GiveReview";
import Header from "./Header/Header";
import Hoodies from "./Home/Hoddies/Hoodies";
import SingleHoodie from "./Home/Hoddies/SingleHoodie/SingleHoodie";
import Home from "./Home/Home";
import AddProducts from "./Home/Profile/Addproduct/AddProducts";
import Profile from "./Home/Profile/Profile";
import useAuth from "./Hooks/UseAuth";
import Login from "./Login/Login";
import Register from "./Login/Register/Register";
import Navigation from "./Navigation/Navigation";
import OrderedItem from "./OrderedItems/OrderedItem";

const AllRoutes = () => {
  const { user, isAdmin } = useAuth();
  return (
    <NativeRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hoodies" element={<Hoodies showAll={true} />} />
        <Route path="/hoodies/:id" element={<SingleHoodie />} />

        <Route path="/cart" element={user?.email ? <Cart /> : <Login />} />
        <Route
          path="/OrderedItems"
          element={user?.email ? <OrderedItem /> : <Login />}
        />
        <Route
          path="/setReview"
          element={user?.email ? <GiveReview /> : <Login />}
        />
        <Route
          path="/add-product"
          element={user?.email && isAdmin ? <AddProducts /> : <Profile />}
        />
      </Routes>
      <Navigation />
    </NativeRouter>
  );
};

export default AllRoutes;
