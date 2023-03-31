import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import ChangeDate from "./ChangeDate";
import DisplayLocations from "./DisplayLocations";
import RecordExpense from "./RecordExpense";

export default function AllLocations({ email }) {
  return (
    <View style={styles.container}>
      <Text>All Locations</Text>
      <ChangeDate />
      <RecordExpense/>
      <DisplayLocations email={email} />
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
