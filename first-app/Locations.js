import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  Platform,
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
    <>
      <Text style={styles.heading}>Sklepy</Text>
      {/* Умовна логіка для вибору компонента прокрутки */}
      {Platform.OS === "web" ? (
        <div style={styles.scrollViewWeb} key={length}>
          {data.map(({ code, name }) => (
            <Pressable
              key={code}
              onPress={() => navigation.navigate("ShopStuf", { code, name })}
              style={styles.item}
            >
              <Text>
                {code}: {name}
              </Text>
            </Pressable>
          ))}
        </div>
      ) : (
        <ScrollView style={styles.scrollView}>
          {data.map(({ code, name }) => (
            <Pressable
              key={code}
              onPress={() => navigation.navigate("ShopStuf", { code, name })}
            >
              <Text style={styles.item}>
                {code}: {name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewWeb: {
    overflowY: "auto",
    maxHeight: "90vh", // Параметр для обмеження висоти на веб-платформі
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
