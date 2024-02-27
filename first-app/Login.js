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

const Login = () => {
    const navigation = useNavigation();
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text>Login screen</Text>

          <Button
            title="Navigate to home screen"
            onPress={() => navigation.navigate('Home', {
                screen: 'Setting',
                params: {userId: "e43"}})}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              placeholder="Type text"
              value={text}
              onChangeText={setText}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default Login;
