import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { dateRecordAction } from "../../../Redux/actions";

export default function ChangeDate() {
  const dispatch = useDispatch();
  return (
    <View style={styles.itemslayout}>
      <View style={styles.item}>
        <Pressable
          onPress={() => dispatch(dateRecordAction("TODAY"))}
          style={styles.button}
        >
          <Text style={styles.text}>today</Text>
        </Pressable>
      </View>
      <View style={styles.item}>
        <Pressable
          onPress={() => dispatch(dateRecordAction("1 MONTH"))}
          style={styles.button}
        >
          <Text style={styles.text}>1 month</Text>
        </Pressable>
      </View>
      <View style={styles.item}>
        <Pressable
          onPress={() => dispatch(dateRecordAction("1 YEAR"))}
          style={styles.button}
        >
          <Text style={styles.text}>1 year</Text>
        </Pressable>
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

  //---------------- BUTTON-----------------------------------------------------------------------------------------
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "rgba(0, 0, 0,0.6)",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  //---------------------------------------------------------------------------------------------------------
});
