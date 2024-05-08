import React from "react";
import { useSelector } from "react-redux";
import Categories from "./Categories";
import Types from "./Types";
import Producers from "./Producers";
import SexList from "./SexList";
import Sizes from "./Sizes";
import { StyleSheet, View } from "react-native";

const Filter = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <View>
      <Producers token={token} />
      <Types token={token} />
      <Categories token={token} />
      <SexList token={token} />
      <Sizes token={token} />
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

export default Filter;
