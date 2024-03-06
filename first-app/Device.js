import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Device = () => {
  const navigation = useNavigation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [deviceId, setDeviceId] = useState("string");
  const [deviceAlias, setDeviceAlias] = useState("string");
  const [platform, setPlatform] = useState("android");
  const [error, setError] = useState("");

  const device = () => {
    const requestData = {
      login,
      password,
      deviceAlias,
      deviceId,
      platform,
    };

    axios
      .post("http://bart.intersport.pl:33001/auth/device", requestData)
      .then((response) => {
      
       navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text>Device screen</Text>

        <TextInput
          style={styles.input}
          placeholder="Login"
          value={login}
          onChangeText={setLogin}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Device ID"
          value={deviceId}
          onChangeText={setDeviceId}
        />

        <TextInput
          style={styles.input}
          placeholder="App Version"
          value={deviceAlias}
          onChangeText={setDeviceAlias}
        />
        <TextInput
          style={styles.input}
          placeholder="App Version"
          value={platform}
          onChangeText={setPlatform}
        />

        <Button title="Login device" onPress={device} />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
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

export default Device;
