import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { dateRecordAction } from "../../../Redux/actions";



export default function ChangeDate() {
  const dispatch = useDispatch()
  return (
    <View style={styles.itemslayout}>
      <View style={styles.item}>
        <Button title="today" onPress={() => dispatch(dateRecordAction("TODAY"))} />
      </View>
      <View style={styles.item}>
        <Button title="1 month" onPress={() => dispatch(dateRecordAction("1 MONTH"))} />
      </View>
      <View style={styles.item}>
        <Button title="1 year" onPress={() => dispatch(dateRecordAction("1 YEAR"))} />
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
