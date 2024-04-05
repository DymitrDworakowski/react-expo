import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from 'react-native-picker-select';

import axios from "axios";

import {
  StyleSheet,
  Text,
  View,
  
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
const Tabs = createBottomTabNavigator();

function Settings() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
}

const Filter = () => {
  const route = useRoute();
  const { token } = route.params;
  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState("java");
  console.log(categories);

  const requestData = {
    filterDictionary: "categories",
    locationCode: "W07",
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
    {pickerItems.map((item, index) => (
      <RNPickerSelect
        key={index}
        onValueChange={(value) => console.log(value)}
        items={[{ label: item.label, value: item.value }]}
      />
    ))}
  </View>

    // <Tabs.Navigator

    //       screenOptions={({ route }) => ({
    //         tabBarIcon: ({ focused, color, size }) => {
    //           let iconName;

    //           if (route.name === "Profile") {
    //             iconName = focused
    //               ? "ios-information-circle"
    //               : "ios-information-circle-outline";
    //           } else if (route.name === "Settings") {
    //             iconName = focused ? "ios-list-box" : "ios-list";
    //           }
    //           return <Ionicons name={iconName} size={size} color={color} />;
    //         },
    //       })}
    //       tabBarOptions={{
    //         activeTintColor: "tomato",
    //         inactiveTintColor: "gray",
    //       }}
    //     >
    //       <Tabs.Screen name="Settings" component={Settings} />
    //       <Tabs.Screen name="Profile" component={Profile} />
    //     </Tabs.Navigator>
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
