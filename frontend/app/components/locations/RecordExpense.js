import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { switchRecordAction } from "../../../Redux/actions";

export default function ChangeDate() {
  const dispatch = useDispatch();
  return (
    <View style={styles.itemslayout}>
      <View style={styles.item}>
        <Button
          title="Not Recorded"
          onPress={() => dispatch(switchRecordAction("expense NOT recorded"))}
        />
      </View>
      <View style={styles.item}>
        <Button
          title="Recorded"
          onPress={() => dispatch(switchRecordAction("expense recorded"))}
        />
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
