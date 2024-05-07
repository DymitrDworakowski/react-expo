import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";

const Sizes = () => {
  const route = useRoute();
  const { token } = route.params;
  const [sizes, setSizes] = useState([]);
  console.log(sizes);

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

export default Sizes;