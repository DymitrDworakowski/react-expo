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
  const { code, token } = route.params; // Отримання токену з параметрів навігації
  const [salonStuf, setSalonStuf] = useState([]);
  const [error, setError] = useState("");
  console.log(salonStuf);

  const requestData = {
    pageNo: 0,
    locationCode: code,
    availabilityType: "inSales",
    withPhotos: false,
    withActiveDiscounts: false,
    name: "",
    price: { from: 0, to: 0 },
    commodityGroup: "",
    categories: [],
    producers: [],
    sexList: [],
    sizes: [],
  };
  useEffect(() => {
    fetchStuf();
  }, []);

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
      <Text>{code}</Text>

      {salonStuf.length > 0 ? (
        salonStuf.map(({ idModCol, producer, indexes, category }) => (
          <View key={idModCol}>
            <Text>Producent: {producer}</Text>
            {indexes.map(({ price, ean, size, shortName, longName, stock }) => (
              <View key={ean}>
                <Text>Nazwa: {shortName}</Text>
                <Text>Kategoria: {category}</Text>
                <Text>Cena: {price.salePrice}</Text>
                <Text> EAN: {ean} </Text>
                {size !== "" ? (<Text> Size:{size}</Text>):(
                  <Text> Size: Niema rozmiaru </Text>
                )}
                <Text>Stany: {stock.inSale},</Text>
                <Text>Stany {code}: {stock.inStore}</Text>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
