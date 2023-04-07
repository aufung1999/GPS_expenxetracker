import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import DisplayLocations_NR from "./DisplayLocations_NR";
import RecordExpense from "./RecordExpense";
import { useSelector } from "react-redux";
import DisplayLocations_R from "./DisplayLocations_R";

export default function AllLocations({ email }) {
  const switchRecord = useSelector((state) => state.switchRecord);

  // console.log("switchRecord: " + switchRecord);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>All Locations</Text>

      <RecordExpense />

      {switchRecord === "expense NOT recorded" && (
        <DisplayLocations_NR email={email} />
      )}

      {switchRecord === "expense recorded" && (
        <DisplayLocations_R email={email} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

    // borderWidth: 10,
    // borderColor: "black",
  },

  headline:{
    borderWidth:1,
  },
});
