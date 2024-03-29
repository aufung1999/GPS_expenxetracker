import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { currentPositionAction } from "../../../Redux/actions";

const LOCATION_TRACKING = "location-tracking";

export default function PermissionsButton() {
  const dispatch = useDispatch();

  const handlePermission = async () => {
    startLocationTracking();
    config();
  };

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 10000,
      distanceInterval: 0,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    console.log("tracking started?", hasStarted);
  };

  const config = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access location was denied");
    } else {
      console.log("Permission to access location granted");
    }
  };

  // useEffect((
  // ) => {
  //   config();
  // }, []);

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 60000);
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
        let obj = { lat: array[0], lng: array[1] };

        // console.log(obj)

        dispatch(currentPositionAction(obj));
      }
    });
  }, [time]);

  return (
    <View style={styles.container}>
      <Button title="Start tracking" onPress={handlePermission} />
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
    let lng = locations[0].coords.longitude;

    await AsyncStorage.setItem("position", `${lat},${lng}`);

    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${lng}`);
  }
});
