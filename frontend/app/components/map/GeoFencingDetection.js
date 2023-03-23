import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";

import GeoFencing from "react-native-geo-fencing";
import { GOOGLE_API } from "@env";
import { locationsAction_remove } from "../../../Redux/actions";

export default function GeoFencingDetection({
  southwest,
  northeast,
  place_id,
  name,
  currentPosition,
  count,
}) {

  // const polygon = [
  //   { lat: northeast.lat, lng: northeast.lng },
  //   { lat: northeast.lat, lng: southwest.lng },
  //   { lat: southwest.lat, lng: southwest.lng },
  //   { lat: southwest.lat, lng: northeast.lng },
  //   { lat: northeast.lat, lng: northeast.lng }, // last point has to be same as first point
  // ];

  // GeoFencing.containsLocation(currentPosition, polygon)
  //   .then(() => console.log("++++++point is within polygon+++++++++"))
  //   .catch(() =>
  //     console.log("---------point is NOT within polygon-------------")
  //   );

  return (
    <View>
      <Text>{name} {count}</Text>
    </View>
  );
}
