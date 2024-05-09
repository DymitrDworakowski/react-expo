import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

import { StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { filterSlice } from "../redux/slice";

const SexList = () => {
  const token = useSelector((state) => state.auth.token);
  const [sexList, setSexList] = useState([]);
  const dispatch = useDispatch();

  const requestData = {
    filterDictionary: "sexList",
    locationCode: "",
    availabilityType: "all",
    withPhotos: true,
    withActiveDiscounts: false,
  };

  useEffect(() => {
    filterSexList();
  }, []);

  const filterSexList = async () => {
    axios
      .post(
        "https://apps.intersport.pl/ams/api/v2/product/filters",
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSexList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  };
  const pickerItems = sexList.map((type) => ({
    label: type,
    value: type,
  }));
  const sex = useSelector((state) => state.filter.sexList);
  
  return (
    <View>
      <Text>Płeć</Text>
      <RNPickerSelect
        onValueChange={(value) =>
          dispatch(filterSlice.actions.setSexList(value))
        }
        items={pickerItems.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
        value={sex}
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

export default SexList;
