import React, { useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import PermissionsButton from "./PermissionsButton";
import { useDispatch, useSelector } from "react-redux";

import { GOOGLE_API } from "@env";
import {
  locationsAction_add,
  locationsAction_remove,
  locationsAction_passed,
  locationsAction_countTime,
} from "../../../Redux/actions";
import GeoFencingDetection from "./GeoFencingDetection";
// import {API_URL, API_TOKEN} from 'react-native-dotenv'

export default function MainMap() {
  const mapRef = useRef();
  const currentPosition = useSelector((state) => state.currentPosition);
  const locations = useSelector((state) => state.locations);
  const dispatch = useDispatch();

  const { width, height } = Dimensions.get("window");

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    if (currentPosition) {
      mapRef.current.animateToRegion({
        latitude: currentPosition.lat,
        longitude: currentPosition.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });

      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentPosition.lat},${currentPosition.lng}&radius=30&key=${GOOGLE_API}`
      )
        .then((res) => res.json())
        .then((data) => {
          const filtered = data["results"].filter(
            (each) => each.price_level != null
          );
          // console.log(filtered);
          if (filtered.length != 0) {
            filtered.map((each) => {
              console.log(
                "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
              );
              console.log(each.name + ":");
              console.log(each.place_id);
              // console.log(each["geometry"].viewport);
              console.log(
                "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
              );

              dispatch_obj = {
                place_id: each.place_id,
                viewport: each["geometry"].viewport,
                name: each.name,
                count: 0,
              };

              const someRes = locations.some(
                (EACH) => EACH.place_id == each.place_id
              );
              console.log("someRes: " + someRes);
              someRes
                ? dispatch(locationsAction_countTime({place_id: each.place_id}))
                : dispatch(locationsAction_remove(dispatch_obj));

              dispatch(locationsAction_add(dispatch_obj));
            });
          } else {
            console.log("NOTHING");
            dispatch(locationsAction_passed());
          }
        });
    }
  }, [currentPosition]);

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
      {/* <View style={styles.searchContainer}>
        <>
          <Text>???</Text>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            onPress={(data, details = null) => {
              onPlaceSelected(details);
            }}
            query={{
              key: `${GOOGLE_API}`,
              language: "en",
            }}
          />
        </>
      </View> */}

      <View style={styles.permissionbtn}>
        <PermissionsButton />
      </View>

      <View style={styles.geofeceningdetection}>
        {locations &&
          locations.map((each) => (
            <View style={styles.inner} key={each.place_id}>
              <GeoFencingDetection //deconstruct from locations reducer
                southwest={each["viewport"].southwest}
                northeast={each["viewport"].northeast}
                place_id={each.place_id}
                name={each.name}
                currentPosition={currentPosition}
                count={each.count}
              />
            </View>
          ))}
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
  geofeceningdetection: {
    backgroundColor: "white",
    position: "absolute",
    width: "90%",
    elevation: 4,
    padding: 8,
    top: Constants.statusBarHeight + 150,
  },
  inner: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
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
