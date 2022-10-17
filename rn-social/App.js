import React from "react";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";

export default function App() {
  const route = useRoute({});
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{route}</NavigationContainer>;
}
