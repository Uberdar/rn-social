import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
  nickname: "",
};

export default function RegisterScreen({ navigation }) {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const dispatch = useDispatch();
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedMail, setIsFocusedMail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const [state, setState] = useState(initialState);

  const hideKeyboard = () => {
    Keyboard.dismiss();

    setIsShownKeyboard(false);
  };
  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidHide = () => setIsShownKeyboard(false);

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.mainBG}
          source={require("../../assets/mainBG.png")}
        >
          <KeyboardAvoidingView>
            <View
              style={{
                ...styles.whiteBackground,
                marginBottom: isShownKeyboard ? -150 : 0,
              }}
            >
              <View style={styles.avatar}></View>
              <View style={styles.mainForm}>
                <Text style={styles.mainHeader}>Регистрация</Text>
                <TextInput
                  style={{
                    ...styles.textInputs,
                    backgroundColor: isFocusedLogin ? "#ffffff" : "#f6f6f6",
                    color: isFocusedLogin ? "#212121" : "#BDBDBD",
                    borderColor: isFocusedLogin ? "#ff6c00" : "#e8e8e8",
                    marginTop: 32,
                    marginBottom: 16,
                  }}
                  placeholder="Логин"
                  onFocus={() => {
                    setIsFocusedLogin(true);
                    setIsShownKeyboard(true);
                  }}
                  onBlur={() => {
                    setIsFocusedLogin(false);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, nickname: value }))
                  }
                  value={state.nickname}
                ></TextInput>
                <TextInput
                  style={{
                    ...styles.textInputs,
                    backgroundColor: isFocusedMail ? "#ffffff" : "#f6f6f6",
                    color: isFocusedMail ? "#212121" : "#BDBDBD",
                    borderColor: isFocusedMail ? "#ff6c00" : "#e8e8e8",
                    marginBottom: 16,
                  }}
                  placeholder="Адрес электронной почты"
                  onFocus={() => {
                    setIsFocusedMail(true);
                    setIsShownKeyboard(true);
                  }}
                  onBlur={() => setIsFocusedMail(false)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  value={state.email}
                ></TextInput>
                <TextInput
                  style={{
                    ...styles.textInputs,
                    backgroundColor: isFocusedPassword ? "#ffffff" : "#f6f6f6",
                    color: isFocusedPassword ? "#212121" : "#BDBDBD",
                    borderColor: isFocusedPassword ? "#ff6c00" : "#e8e8e8",
                  }}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  onFocus={() => {
                    setIsFocusedPassword(true);
                    setIsShownKeyboard(true);
                  }}
                  onBlur={() => setIsFocusedPassword(false)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  value={state.password}
                ></TextInput>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.submitBtn}
                    onPress={() => {
                      hideKeyboard();
                      console.log(state);
                      dispatch(authSignUpUser(state));
                      setState(initialState);
                    }}
                  >
                    <Text style={styles.submitBtnText}>Зарегистироваться</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    activeOpacity={0.8}
                    style={styles.changeToAnotherPage}
                  >
                    <Text style={styles.changeToAnotherPageText}>
                      Уже есть аккаунт? Войти
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  whiteBackground: {
    backgroundColor: "#ffffff",
    height: 550,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    marginBottom: 0,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#000000",
    marginTop: -50,
    borderRadius: 10,
  },
  mainForm: {
    alignItems: "center",
  },
  mainHeader: {
    color: "#000000",
    fontSize: 30,
    marginTop: 32,
    fontFamily: "Roboto-Medium",
  },
  textInputs: {
    backgroundColor: "#f6f6f6",
    width: 340,
    height: 50,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    placeholderTextColor: "#BDBDBD",
    fontFamily: "Roboto-Regular",
  },
  submitBtn: {
    marginTop: 43,
    height: 51,
    width: 343,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  submitBtnText: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "Roboto-Regular",
  },
  changeToAnotherPage: {
    alignItems: "center",
    marginTop: 16,
  },
  changeToAnotherPageText: {
    color: "#000000",
    fontFamily: "Roboto-Regular",
  },
});
