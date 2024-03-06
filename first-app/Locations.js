import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const Locations = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params; // Отримання токену з параметрів навігації
  const [salonsData, setSalonsData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchSalons();
  }, []); // Виклик функції після завантаження компонента

  const fetchSalons = () => {
    axios
      .get("http://bart.intersport.pl:33001/auth/locations", {
        headers: { Authorization: `Bearer ${token}` }, // Додавання токену до заголовків запиту
      })
      .then((response) => {
        setSalonsData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };

  return (
    <ScrollView >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text>Sklepy</Text>
        {salonsData.map(({ code, name }) => (
          <View key={code}>
            <Text>{code}: {name}</Text>
          </View>
        ))}

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    </ScrollView>
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

export default Locations;
