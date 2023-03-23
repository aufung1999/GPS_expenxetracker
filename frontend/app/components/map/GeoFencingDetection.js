import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";

export default function GeoFencingDetection() {

    const locations = useSelector(state => state.locations)

  return (
    <View style={styles.geofecningdetection}>
      <Text>GeoFencing</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  geofecningdetection: {
    backgroundColor: "white",
    position: "absolute",
    width: "90%",
    elevation: 4,
    padding: 8,
    top: Constants.statusBarHeight + 100,
  },
});
