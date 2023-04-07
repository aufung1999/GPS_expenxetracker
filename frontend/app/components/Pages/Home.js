import React from "react";
import { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { ScreenAction } from "../../../Redux/actions";
import MainMap from "../map/MainMap";

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ScreenAction("Home"));
  }, []);

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
