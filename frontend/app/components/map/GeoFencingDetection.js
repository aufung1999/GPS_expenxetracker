import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Constants from "expo-constants";

export default function GeoFencingDetection({ southwest, northeast, name }) {
  console.log(southwest);
  console.log(northeast);

  const polygon = [
    { lat: 3.1336599385978805, lng: 101.31866455078125 },
    { lat: 3.3091633559540123, lng: 101.66198730468757 },
    { lat: 3.091150714460597, lng: 101.92977905273438 },
    { lat: 2.7222113428196213, lng: 101.74850463867188 },
    { lat: 2.7153526167685347, lng: 101.47933959960938 },
    { lat: 3.1336599385978805, lng: 101.31866455078125 }, // last point has to be same as first point
  ];

  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
