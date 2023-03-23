import React, { useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import PermissionsButton from "./PermissionsButton";
import { useDispatch, useSelector } from "react-redux";

import GeoFencing from "react-native-geo-fencing";

import { GOOGLE_API } from "@env";
import { locationsAction_add, locationsAction_remove } from "../../../Redux/actions";
import GeoFencingDetection from "./GeoFencingDetection";
// import {API_URL, API_TOKEN} from 'react-native-dotenv'

export default function MainMap() {
  const mapRef = useRef();
  const trackingPosition = useSelector((state) => state.trackingPosition);
  const locations = useSelector((state) => state.locations);
  const dispatch = useDispatch();

  const [coordinates, setCoordinates] = useState(null);

  const { width, height } = Dimensions.get("window");

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    if (trackingPosition) {
      mapRef.current.animateToRegion({
        latitude: trackingPosition.lat,
        longitude: trackingPosition.long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });

      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${trackingPosition.lat},${trackingPosition.long}&radius=30&key=${GOOGLE_API}`
      )
        .then((res) => res.json())
        .then((data) =>
          data["results"].map((each) => {
            if (each.price_level) {
              console.log(
                "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
              );
              console.log(each.name + ":");
              console.log(each.place_id);
              console.log(each["geometry"].viewport);
              console.log(
                "++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
              );
              setCoordinates(each["geometry"].viewport);

              dispatch_obj = {
                place_id: each.place_id,
                viewport: each["geometry"].viewport,
                name: each.name,
              };

              dispatch( locationsAction_remove(dispatch_obj))
              dispatch(locationsAction_add(dispatch_obj));
            }
          })
        );
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
              key: `${GOOGLE_API}`,
              language: "en",
            }}
          />
        </>
      </View>

      <View style={styles.permissionbtn}>
        <PermissionsButton />
      </View>

      <View style={styles.geofeceningdetection}>
        {locations &&
          locations.map((each) => (
            <View style={styles.inner} key={each.place_id}>
              <GeoFencingDetection  //deconstruct from locations reducer
                southwest={each["viewport"].southwest}
                northeast={each["viewport"].northeast}
                name={each.name}
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
