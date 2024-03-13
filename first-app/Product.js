import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

const Product = () => {
  const route = useRoute();
  const { idModCol, producer, indexes, category } = route.params;

  return (
    
      <View style={styles.container}key={idModCol}>
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
            <Text>Stany {stock.inStore}</Text>
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
    borderColor: "black", // Border color
    borderWidth: 1, // Border width
  },
 
//   item: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 4,
//     padding: 10,
//     marginBottom: 10,
//     width: "95%",
//   },

});

export default Product;
