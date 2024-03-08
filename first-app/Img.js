import React, { useEffect, useState } from "react";
import { Image, Text } from "react-native";
import axios from "axios";

const Img = ({ idModCol, token }) => {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(null);
  const fetchImg = () => {
    axios
      .get(`https://apps.intersport.pl/ams/api/v2/photo/mainById/${idModCol}`, {
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
    <>
      {img !== null ? (
        <Image
          key={img.id}
          style={{ width: 100, height: 100 }}
          source={{ uri: `data:image/jpeg;base64,${img.base64}` }}
        />
      ) : (
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: "./img/Z2000128430.jpg" }}
        />
      )}
    </>
  );
};
export default Img;
