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

  return (
    <View>
      <Text>{name} {count}</Text>
    </View>
  );
}
