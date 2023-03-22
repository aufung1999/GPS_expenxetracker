import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import MainMap from "../map/MainMap";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <MainMap />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
