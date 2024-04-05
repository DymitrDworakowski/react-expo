import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RNPickerSelect from "react-native-picker-select";

import axios from "axios";
import Categories from "./Categories";
import Types from "./Types";
import Producers from "./Producers";
import SexList from "./SexList";
import Sizes from "./Sizes";
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

  return (
    <View>
      <Producers token={token} />
      <Types token={token} />
      <Categories token={token} />
      <SexList token={token} />
      <Sizes token={token} />
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
