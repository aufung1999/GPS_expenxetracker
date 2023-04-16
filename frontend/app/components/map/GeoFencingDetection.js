import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";

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
      <Text>
        {name} {count}
      </Text>
    </View>
  );
}
