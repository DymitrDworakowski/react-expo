import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Img from "./Img";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

const ShopStuf = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.token);
  const route = useRoute();
  const { code, name } = route.params;
  const [salonStuf, setSalonStuf] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const requestData = {
    pageNo: page,
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

    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()} title="Back" color="#000" />
      ),
      headerRight: () => (
        <View style={styles.headerButtons}>
          <Button
            onPress={() => {
              // Дії, що відбуваються при натисканні кнопки Сканування
            }}
            title="Skanowanie"
            color="#000"
          />
          <Button
            onPress={() =>
              navigation.navigate("Filter")
            }
            title="Filtr"
            color="#000"
          />
        </View>
      ),
    });
  }, [navigation]);

  const fetchStuf = async () => {
    setLoading(true);
    axios
      .post("https://apps.intersport.pl/ams/api/v2/product/list", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        
        setSalonStuf([...salonStuf, ...response.data.products]);
        setLoading(false);
        setPage((prewPage) => prewPage + 1); // Після отримання даних оновіть сторінку
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      });
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isCloseToBottom && !loading) {
      fetchStuf(); // завантажте нові дані, якщо користувач близько до кінця списку і не йде інше завантаження
    }
  };

  return (
    <View>
      <Text style={styles.fixedText}>
        {code} {name}
      </Text>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={300}>
        {salonStuf.length > 0 ? (
          salonStuf.map(
            ({ idModCol, producer, indexes, category, producerModel }) => (
              <TouchableOpacity
                key={idModCol}
                onPress={() =>
                  navigation.navigate("Product", {
                    idModCol,
                    producer,
                    indexes,
                    category,
                    token,
                  })
                }
              >
                <View style={styles.container}>
                  {Array.from(
                    new Set(
                      indexes.map(
                        ({ shortName, price }) =>
                          `${shortName}-${price.salePrice}-${price.ecomPrice}-${price.cataloguePrice}`
                      )
                    )
                  ).map((uniqueShortNameAndPrice) => {
                    const [shortName, salePrice, ecomPrice, cataloguePrice] =
                      uniqueShortNameAndPrice.split("-");
                    return (
                      <View key={uniqueShortNameAndPrice} style={styles.item}>
                        <Text>{shortName}</Text>
                        <Text>Producent: {producer}</Text>
                        <Img idModCol={idModCol} token={token} />
                        <Text>Model: {producerModel} </Text>
                        <Text>{category}</Text>
                        <Text>Cena sal: {salePrice}</Text>
                        <Text>Cena ecom: {ecomPrice}</Text>
                        <Text>Cena katalogowa:{cataloguePrice}</Text>

                        <Text>
                          {indexes.map(({ stock }) =>
                            stock.inStore === 0 ? (
                              <Text key={stock.inStore}>
                                Stany {code} {name} : Towar nie dostępny
                              </Text>
                            ) : (
                              <Text key={stock.inStore}>
                                Stany w salonie {stock.inStore}
                              </Text>
                            )
                          )}
                        </Text>
                        <Text>
                          Stany calkowite:
                          {indexes.map(({ stock }) => stock.inSale)}
                        </Text>
                      </View>
                    );
                  })}
                  <View style={styles.item}>
                    <Text>
                      Size: {indexes.map(({ size }) => size).join(", ")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          )
        ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}

        {loading && <ActivityIndicator style={styles.loadingIndicator} />}
        {error && <Text style={styles.error}>{error}</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    borderColor: "black", // Border color
    borderWidth: 1, // Border width
  },
  fixedText: {
    backgroundColor: "#FFFFFF",
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: "95%",
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
