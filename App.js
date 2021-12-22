import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Header from "./Screens/Header/Header";
import AuthProvider from "./Screens/Hooks/Provider/AuthProvider";
import AllRoutes from "./Screens/AllRoutes";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar animated={true} backgroundColor="#fff" />
          <AllRoutes />
        </SafeAreaView>
      </AuthProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : "",
  },
});

export default App;
