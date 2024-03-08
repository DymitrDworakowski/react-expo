import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import Img from "./Img";
import { useNavigation, useRoute } from "@react-navigation/native";

const ShopStuf = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { code, token } = route.params;
  const [salonStuf, setSalonStuf] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // початкова сторінка

  const requestData = {
    pageNo: page, // використовуйте поточну сторінку
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
    setLoading(true);
    axios
      .post("https://apps.intersport.pl/ams/api/v2/product/list", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSalonStuf([...salonStuf, ...response.data.products]);
        setLoading(false);
        setPage((prewPage)=> prewPage + 1); // Після отримання даних оновіть сторінку
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      });
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isCloseToBottom && !loading) {
      fetchStuf(); // завантажте нові дані, якщо користувач близько до кінця списку і не йде інше завантаження
    }
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={100}>
      <Text>{code}</Text>

      {salonStuf.length > 0 ? (
        salonStuf.map(({ idModCol, producer, indexes, category }) => (
          <View key={idModCol}>
            <Img idModCol={idModCol} token={token} />
            <Text>Producent: {producer}</Text>
            {indexes.map(({ price, ean, size, shortName, stock }) => (
              <View key={ean}>
                <Text>
                  Nazwa: {shortName}, {idModCol}
                </Text>
                <Text>Kategoria: {category}</Text>
                <Text>Cena: {price.salePrice}</Text>
                <Text> EAN: {ean} </Text>
                {size !== "" ? (
                  <Text> Size: {size}</Text>
                ) : (
                  <Text> Size: Brak rozmiaru </Text>
                )}
                <Text>Stany: {stock.inSale},</Text>
                <Text>
                  Stany {code}: {stock.inStore}
                </Text>
              </View>
            ))}
          </View>
        ))
      ) : (
        <View>
        <Text>Loading...</Text>
        </View>
      )}
      
      {loading && <ActivityIndicator style={styles.loadingIndicator} />}
      {error && <Text style={styles.error}>{error}</Text>}
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
  loadingIndicator: {
    marginTop: 10,
  },
});

export default ShopStuf;
