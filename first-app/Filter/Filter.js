import React from "react";
import { useSelector } from "react-redux";
import Categories from "./Categories";
import Types from "./Types";
import Producers from "./Producers";
import SexList from "./SexList";
import Sizes from "./Sizes";
import { StyleSheet, View,TextInput, } from "react-native";

const Filter = () => {
  const token = useSelector((state) => state.auth.token);

  const requestData = {
    pageNo: '',
    locationCode: '',
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

  const fetchStuf = async () => {

    axios
      .post("https://apps.intersport.pl/ams/api/v2/product/list", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        
        console.log(response)

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      
      });
  };


  return (
    <View>
      <TextInput
          style={styles.input}
          placeholder="Nazwa produktu"
          // value={0}
         
        />
       <TextInput
          style={styles.input}
          placeholder="Cena od"
          // value={0}
         
        />
          <TextInput
          style={styles.input}
          placeholder="Cena do"
          // value={0}
         
        />
      <Producers token={token} />
      <Types token={token} />
      <Categories token={token} />
      <SexList token={token} />
      <Sizes token={token} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default Filter;
