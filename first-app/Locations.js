import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { locationSlice } from "./redux/slice";

const Locations = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSalons();
  }, []); // Виклик функції після завантаження компонента

  const fetchSalons = () => {
    axios
      .get("https://apps.intersport.pl/ams/api/v2/auth/locations", {
        headers: { Authorization: `Bearer ${token}` }, // Додавання токену до заголовків запиту
      })
      .then((response) => {
        dispatch(locationSlice.actions.setLocation(response.data.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };

  const data = useSelector((state) => state.location.locations);

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.heading}>Sklepy</Text>
      {data.map(({ code, name }) => (
        <TouchableOpacity
          key={code}
          onPress={() => navigation.navigate("ShopStuf", { code, name })}
        >
          <Text style={styles.item}>
            {code}: {name}
          </Text>
        </TouchableOpacity>
      ))}
      {error && <Text style={styles.error}>{error}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "white", // Background color for ScrollView
    flex: 1,
    padding: 20,
    borderColor: "black", // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    alignItems: "center",
    height: 30,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 5,
  },

  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Locations;
