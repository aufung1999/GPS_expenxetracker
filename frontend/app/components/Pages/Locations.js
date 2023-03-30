import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useLogin } from "../../context/LoginProvider";
import AllLocations from "../locations/AllLocations";

const Locations = () => {
  const { setIsLoggedIn, profile } = useLogin();

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
