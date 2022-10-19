import React from "react";
import { useFonts } from "expo-font";

import { Provider } from "react-redux";

// import { NavigationContainer } from "@react-navigation/native";

// import { useRoute } from "./router";
import { store } from "./redux/store";
import Main from "./components/Main";
// import db from "./firebase/config";

export default function App() {
  // const [user, setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  // const route = useRoute(user);
  if (!fontsLoaded) {
    return null;
  }

  // db.auth().onAuthStateChanged((user) => setUser(user));

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
