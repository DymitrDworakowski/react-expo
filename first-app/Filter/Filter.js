import React from "react";
import { useSelector } from "react-redux";
import Categories from "./Categories";
import Types from "./Types";
import Producers from "./Producers";
import SexList from "./SexList";
import Sizes from "./Sizes";
import { StyleSheet, View, TextInput,Pressable,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Filter = () => {
  const token = useSelector((state) => state.auth.token);
  const producer = useSelector((state) => state.filter.producers);
  const category = useSelector((state) => state.filter.category);
  const sex = useSelector((state) => state.filter.sexList);
  const size = useSelector((state) => state.filter.size);
  const type = useSelector((state) => state.filter.type);
  const data = useSelector((state) => state.location.locations);
  const navigation = useNavigation();

  const namesAndCodes = data.map(({ name, code }) => ({ name, code }));

  const requestData = {
    pageNo: "",
    locationCode: "",
    availabilityType: "inSales",
    withPhotos: false,
    withActiveDiscounts: false,
    name: "",
    price: { from: 0, to: 0 },
    commodityGroup: type,
    categories: [category],
    producers: [producer],
    sexList: [sex],
    sizes: [size],
  };

  const fetchStuf = async () => {
    axios
      .post("https://apps.intersport.pl/ams/api/v2/product/list", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
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
      <Pressable onPress={() =>
              navigation.navigate("ShopStuf",namesAndCodes)
            }>
        <Text>Search items</Text>
      </Pressable>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
});

export default Filter;
