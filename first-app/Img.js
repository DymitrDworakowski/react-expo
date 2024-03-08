import React, { useEffect, useState } from "react";
import { Image, Text } from "react-native";
import axios from "axios";

const Img = ({ idModCol, token }) => {
  const [img, setImg] = useState(null); 
  const [error, setError] = useState(null); 

  const fetchImg = () => {
    axios
      .get(`http://bart.intersport.pl:33002/photo/mainById/${idModCol}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setImg(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };

  useEffect(() => {
    if (idModCol) {
      // Перевірте, чи передано idModCol
      fetchImg();
    }
  }, [idModCol]); // Додано залежність від idModCol

  // Перевірка, чи зображення не завантажено або відображення помилки
  if (!img) {
    return <Text>Loading...</Text>;
  }

  return (
    <Image
      style={{ width: 100, height: 100 }} // Задайте потрібні розміри
      source={{ uri: `data:image/jpeg;base64,${img.base64}` }} // Додайте тип зображення, якщо він відрізняється
    />
  );
};

export default Img;
