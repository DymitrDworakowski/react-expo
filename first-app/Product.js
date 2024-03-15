import React, { useEffect,useState } from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const Product = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { idModCol, producer, indexes, category,token } = route.params;
  
  console.log(idModCol)
  const [idImg, setIdImg] = useState([]);
  const [imgProduct, setImgProduct] = useState(null);
  
  console.log(idImg)
 
  

  const fetchImgId = async() => {
    try {
      const response = await axios.get(`https://apps.intersport.pl/ams/api/v2/photo/identifiers/${idModCol}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIdImg(response.data);
      console.log(response.data);
      // Викликаємо fetchImages тільки після отримання idImg
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
    
  };
  

  const fetchImages = async () => {
    try {
      if (idImg.length > 0) {
        // Використовуємо метод Promise.all для виконання запитів паралельно
        let responses = await Promise.all(
          idImg.map(({id})  =>
            axios.get(`https://apps.intersport.pl/ams/api/v2/photo/${id}/scanner`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          )
        );
        console.log(responses)
        // Отримуємо дані з кожного відповіді
        const images = responses.map((response) => response.data);
        setImgProduct(images.map((image) => image.base64));
      } else {
        console.error("idImg is null or empty");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
      fetchImgId();
      fetchImages();
  
    // Налаштування заголовка з трема кнопками
   
  }, []);

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
