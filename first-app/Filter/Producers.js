import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

import { StyleSheet, View ,Text} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { filterSlice } from "../redux/slice";

const Producers = () => {
  
  const token = useSelector((state) => state.auth.token);
  const [producers, setProducers] = useState([]);
  const dispatch = useDispatch();

  const requestData = {
    filterDictionary: "producers",
    locationCode: "",
    availabilityType: "all",
    withPhotos: true,
    withActiveDiscounts: false,
  };

  useEffect(() => {
    filterProducers();
  }, []);

  const filterProducers = async () => {
    axios
      .post(
        "https://apps.intersport.pl/ams/api/v2/product/filters",
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setProducers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };
  const pickerItems = producers.map((type) => ({
    label: type,
    value: type,
  }));

  const producer = useSelector((state) => state.filter.producers);

  return (
    <View>
      <Text>Producent</Text>
      <RNPickerSelect
        onValueChange={(value) => dispatch(filterSlice.actions.setProducers(value))}
        items={pickerItems.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
        value={producer}
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

export default Producers;
