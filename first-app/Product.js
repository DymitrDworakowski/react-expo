import React, { useEffect,useState } from "react";
import { View, Text, Button, StyleSheet,Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const Product = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idModCol, producer, indexes, category,token } = route.params;
  const [idImg, setIdImg] = useState(null);
  const [imgProduct, setImgProduct] = useState(null);
  console.log(idImg)
  console.log(imgProduct)

  const fetchImgId = () => {
    axios
      .get(`http://bart.intersport.pl:33002/photo/identifiers/${idModCol}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setIdImg(response.data.map((img) =>img.id ));
        setTimeout( () => {fetchImages(); }, 3000);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };

  const fetchImages = async () => {
    try {
      // Використовуємо метод Promise.all для виконання запитів паралельно
      let responses;
      if (idImg.length >= 1) {
        responses = await Promise.all(
          idImg.map((id) =>
            axios.get(`http://bart.intersport.pl:33002/photo/${id}/scanner`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          )
        );
      } else {
        responses = await Promise.all([
          axios.get(`http://bart.intersport.pl:33002/photo/${idImg[0]}/scanner`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
      }
  
      // Отримуємо дані з кожного відповіді
      const images = responses.map((response) => response.data);
      console.log(images)
      setImgProduct(images.map((image) =>image.base64));
      // Тут можна обробити отримані дані, наприклад, вивести їх у консоль
      
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };


  useEffect(() => {
    fetchImgId();
    
    // Налаштування заголовка з трема кнопками
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          title="Back"
          color="#000"
        />
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
            onPress={() => {
              // Дії, що відбуваються при натисканні кнопки Фільтр
            }}
            title="Filtr"
            color="#000"
          />
        </View>
      ),
    });
  }, [navigation]);

  if (!imgProduct) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container} key={idModCol}>
     {imgProduct.map((base64, index) => (
      <Image
        key={index}
        style={{ width: 100, height: 100 }}
        source={{ uri: `data:image/jpeg;base64,${base64}` }}
      />
    ))}
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
