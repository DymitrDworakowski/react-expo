import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

import { StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { filterSlice } from "../redux/slice";

const Categories = () => {
  const token = useSelector((state) => state.auth.token);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

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

  const category = useSelector((state) => state.filter.category);

  return (
    <View>
      <Text>Kategoria</Text>
      <RNPickerSelect
        onValueChange={(value) =>
          dispatch(filterSlice.actions.setCategories(value))
        }
        items={pickerItems.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
        value={category}
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
