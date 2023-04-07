import React, { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { ScreenAction } from "../../../Redux/actions";
import { useLogin } from "../../context/LoginProvider";
import AllLocations from "../locations/AllLocations";

const Locations = () => {
  const { setIsLoggedIn, profile } = useLogin();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ScreenAction("Locations"));
  }, []);

  return (
    <View style={styles.container}>
      <AllLocations email={profile.email} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Locations;
