import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const Categories = () => {
  
  const token = useSelector((state) => state.auth.token);
  const [categories, setCategories] = useState([]);
  

  const requestData = {
    filterDictionary: "categories",
    locationCode: "",
    availabilityType: "all",
    withPhotos: true,
    withActiveDiscounts: false,
  };

  useEffect(() => {
    filterProduct();
  }, []);

  const filterProduct = async () => {
    axios
      .post(
        "https://apps.intersport.pl/ams/api/v2/product/filters",
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };
  const pickerItems = categories.map((category) => ({
    label: category,
    value: category,
  }));

  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={pickerItems.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
      />
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

export default Categories;
