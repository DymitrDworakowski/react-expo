// Filter.js
import React from "react";
import { useSelector } from "react-redux";
import Categories from "./Categories";
import Types from "./Types";
import Producers from "./Producers";
import SexList from "./SexList";
import Sizes from "./Sizes";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Filter = () => {
  const navigation = useNavigation();
  const data = useSelector((state) => state.location.locations);
  const namesAndCodes = data.map(({ name, code }) => ({ name, code }));

  return (
    <View style={styles.container}>
      {/* Введення фільтрів */}
      <TextInput style={styles.input} placeholder="Nazwa produktu" />
      <TextInput style={styles.input} placeholder="Cena od" />
      <TextInput style={styles.input} placeholder="Cena do" />

      {/* Вибір фільтрів */}
      <Producers />
      <Types />
      <Categories />
      <SexList />
      <Sizes />

      {/* Кнопка для пошуку */}
      <Pressable onPress={() => navigation.navigate("ShopStuf", namesAndCodes)}>
        <Text>Search items</Text>
      </Pressable>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
});

export default Filter;
