import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

import { StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { filterSlice } from "../redux/slice";

const Sizes = () => {
  const token = useSelector((state) => state.auth.token);
  const [sizes, setSizes] = useState([]);
  const dispatch = useDispatch();

  const requestData = {
    filterDictionary: "sizes",
    locationCode: "",
    availabilityType: "all",
    withPhotos: true,
    withActiveDiscounts: false,
  };

  useEffect(() => {
    filterSizes();
  }, []);

  const filterSizes = async () => {
    axios
      .post(
        "https://apps.intersport.pl/ams/api/v2/product/filters",
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSizes(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };
  const pickerItems = sizes.map((type) => ({
    label: type,
    value: type,
  }));
  // const size = useSelector((state) => state.filter.size);
  return (
    <View>
      <Text>Rozmiar</Text>
      <RNPickerSelect
        onValueChange={(value) => dispatch(filterSlice.actions.setSizes(value))}
        items={pickerItems.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
        // value={size}
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

export default Sizes;
