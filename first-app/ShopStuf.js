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

const ShopStuf = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { code,token} = route.params; // Отримання токену з параметрів навігації
  const [salonStuf, setSalonStuf] = useState([]);
  const [error, setError] = useState("");
  console.log(salonStuf)
  useEffect(() => {
    setTimeout(() => {
      fetchStuf();
    }, 2000);
   
  }, []); // Виклик функції після завантаження компонента

  const requestData = {
    pageNo: 0,
    locationCode: code,
    availabilityType: "inSales",
    withPhotos: true,
    withActiveDiscounts: false,
    name: "",
    price: { from: 0, to: 0 },
    commodityGroup: "",
    categories: [],
    producers: [],
    sexList: [],
    sizes: [],
  };

  const fetchStuf = () => {
    axios
    .post("https://apps.intersport.pl/ams/api/v2/product/list", requestData, {
      headers: { Authorization: `Bearer ${token}` }, 
    })
      .then((response) => {
        setSalonStuf(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };

  return (
    <ScrollView>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text>{code}</Text>
        
        {salonStuf.length > 0 ? (
  salonStuf.map(({ producer, indexes, idGood }) => (
    <View key={idGood}>
      <Text>
        Producer: {producer}
      </Text>
      {indexes.map(({ price, ean, size, shortName, longName, stock }) => (
        <View key={ean}>
          <Text>
            Price: {price.salePrice}, ID: {idGood}, EAN: {ean}, Size: {size}, Short Name: {shortName}, Long Name: {longName}, Stock: {stock.inSale}
          </Text>
        </View>
      ))}
    </View>
  ))
) : (
  <Text>Loading...</Text>
)}
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

export default ShopStuf;
