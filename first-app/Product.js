import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Product = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idModCol, producer, indexes, category } = route.params;

  useEffect(() => {
    // Налаштування заголовка з трема кнопками
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          title="Назад"
          color="#000"
        />
      ),
      headerRight: () => (
        <View style={styles.headerButtons}>
          <Button
            onPress={() => {
              // Дії, що відбуваються при натисканні кнопки Сканування
            }}
            title="Сканування"
            color="#000"
          />
          <Button
            onPress={() => {
              // Дії, що відбуваються при натисканні кнопки Фільтр
            }}
            title="Фільтр"
            color="#000"
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container} key={idModCol}>
      <Text>Producent: {producer}</Text>
      {indexes.map(({ price, ean, size, shortName, stock }) => (
        <View key={ean} style={styles.item}>
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
          {stock.inStore === 0 ? (
            <Text>Towar nie dostępny w danym salonie</Text>
          ) : (
            <Text>Stany w salonie {stock.inStore}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    borderColor: "black",
    borderWidth: 1,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: "95%",
  },
  headerButtons: {
    flexDirection: "row",
  },
});

export default Product;
