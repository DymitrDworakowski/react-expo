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
import axios from 'axios';

const Login = () => {
    const navigation = useNavigation();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [deviceId, setDeviceId] = useState("");
    const [appVersion, setAppVersion] = useState("");
    const [error, setError] = useState("");

    const auth = () => {
        const requestData = {
            login,
            password,
            deviceId,
            appVersion
        };

        axios.post('http://bart.intersport.pl:33001/auth/token', requestData)
        .then(response => {
            const { code, message, token, refreshToken, validTo, deviceConfirmationCode } = response.data;
            // Перевірка коду відповіді
            if (code === 0) {
                console.log("Success:", message);
                console.log("Token:", token);
                console.log("Refresh Token:", refreshToken);
                console.log("Valid To:", validTo);
                console.log("Device Confirmation Code:", deviceConfirmationCode);
                // Робіть що-небудь з отриманими даними, наприклад, перехід на іншу сторінку
                navigation.navigate('Home');
            } else {
                setError(message);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError("Error fetching data");
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <Text>Login screen</Text>

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
                    value={appVersion}
                    onChangeText={setAppVersion}
                />

                <Button
                    title="Login"
                    onPress={auth}
                />

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
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default Login;
