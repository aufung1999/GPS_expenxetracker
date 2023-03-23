import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { trackingPositionAction } from "../../../Redux/actions";

const LOCATION_TRACKING = "location-tracking";

export default function PermissionsButton() {
  const dispatch = useDispatch();

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 0,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    console.log("tracking started?", hasStarted);
  };

  useEffect(() => {
    const config = async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        console.log("Permission to access location granted");
      }
    };

    config();
  }, []);

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("position").then((position) => {
      if (position) {
        // console.log(position);
        var array = JSON.parse("[" + position + "]");
        // console.log('array: ' + array[0])
        let obj = { lat: array[0], long: array[1] };

        // console.log(obj)

        dispatch( trackingPositionAction(obj) )
      }
    });
  }, [time]);

  return (
    <View style={styles.container}>
      <Button title="Start tracking" onPress={startLocationTracking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

TaskManager.defineTask("location-tracking", async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    await AsyncStorage.setItem(
      "position",
      `${lat},${long}`
    );

    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
  }
});
