import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

export default function ChangeDate() {
  return (
    <View style={styles.itemslayout}>
      <View style={styles.item}>
        <Button title="today" />
      </View>
      <View style={styles.item}>
        <Button title="1 month" />
      </View>
      <View style={styles.item}>
        <Button title="1 year" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemslayout: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },

  item: {
    margin: 4,
    // height: "20%",
  },
});
