import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

import { StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { filterSlice } from "../redux/slice";

const Types = () => {

  const token = useSelector((state) => state.auth.token);
  const [types, setTypes] = useState([]);
  const dispatch = useDispatch();

  const requestData = {
    filterDictionary: "commodityGroup",
    locationCode: "",
    availabilityType: "all",
    withPhotos: true,
    withActiveDiscounts: false,
  };

  useEffect(() => {
    filterTypes();
  }, []);

  const filterTypes = async () => {
    axios
      .post(
        "https://apps.intersport.pl/ams/api/v2/product/filters",
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setTypes(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };
  const pickerItems = types.map((type) => ({
    label: type,
    value: type,
  }));

  

  return (
    <View>
      <Text>Typ</Text>
      <RNPickerSelect
        onValueChange={(value) => dispatch(filterSlice.actions.setTypes(value))}
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

export default Types;
