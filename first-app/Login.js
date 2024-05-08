import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "./redux/slice";

const Login = () => {
  const navigation = useNavigation();
  const [deviceId, setDeviceId] = useState("string");
  const [appVersion, setAppVersion] = useState("string");
  const [error, setError] = useState("");

  const login = useSelector((state) => state.auth.login);
  const password = useSelector((state) => state.auth.password);

  const dispatch = useDispatch();

  const auth = () => {
    const requestData = {
      login,
      password,
      deviceId,
      appVersion,
    };

    axios
      .post("https://apps.intersport.pl/ams/api/v2/auth/token", requestData)
      .then((response) => {
        const token = response.data.token;
        dispatch(authSlice.actions.userToken(token)); // Передайте токен як аргумент
        navigation.navigate("Locations");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text>Login to AMS</Text>

        <TextInput
          style={styles.input}
          placeholder="Login"
          value={login}
          onChangeText={() => dispatch(authSlice.actions.userLogin(text))}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={() => dispatch(authSlice.actions.userPassword(text))}
        />

        {/* <TextInput
          style={styles.input}
          placeholder="Device ID"
          value={deviceId}
          onChangeText={setDeviceId}
        />

        <TextInput
          style={styles.input}
          placeholder="App Version"
          value={appVersion}
          onChangeText={setAppVersion}
        /> */}

        <Pressable title="Login" onPress={auth}>
          <Text style={styles.button}>Login</Text>
        </Pressable>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:100 ,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  button: {
    color: "white",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    textAlign: "center",
    boxSizing: "none",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Login;
