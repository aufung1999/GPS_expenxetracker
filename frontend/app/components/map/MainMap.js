import React, { useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import PermissionsButton from "./PermissionsButton";
import { useDispatch, useSelector } from "react-redux";

export default function MainMap() {
  const mapRef = useRef();
  const trackingPosition = useSelector((state) => state.trackingPosition);

  const { width, height } = Dimensions.get("window");

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  // const INITIAL_POSITION = {
  //   latitude: trackingPosition.lat,
  //   longitude: trackingPosition.long,
  //   latitudeDelta: LATITUDE_DELTA,
  //   longitudeDelta: LONGITUDE_DELTA,
  // };

  useEffect(() => {
    if (trackingPosition != null) {
      mapRef.current.animateToRegion({
        latitude: trackingPosition.lat,
        longitude: trackingPosition.long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [trackingPosition]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        // initialRegion={INITIAL_POSITION}
        showsUserLocation={true}
        followsUserLocation={true}
      />
      <View style={styles.searchContainer}>
        <>
          <Text>???</Text>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            onPress={(data, details = null) => {
              onPlaceSelected(details);
            }}
            query={{
              key: "AIzaSyCAzWTNbMapvSe80tFJHGw2N1PvVivEuLQ",
              language: "en",
            }}
          />
        </>
      </View>

      <View style={styles.permissionbtn}>
        <PermissionsButton />
      </View>
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  permissionbtn: {
    backgroundColor: "white",
    position: "absolute",
    width: "90%",
    elevation: 4,
    padding: 8,
    top: Constants.statusBarHeight + 100,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
  },
});
