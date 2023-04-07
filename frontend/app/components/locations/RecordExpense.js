import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { switchRecordAction } from "../../../Redux/actions";
import { Pressable } from "react-native";

export default function ChangeDate() {
  const dispatch = useDispatch();
  return (
    <View style={styles.itemslayout}>
      <View style={styles.item}>
        <Pressable
          onPress={() => dispatch(switchRecordAction("expense NOT recorded"))}
          style={styles.button}
        >
          <Text style={styles.text}>Not Recorded</Text>
        </Pressable>
      </View>
      <View style={styles.item}>
        <Pressable
          onPress={() => dispatch(switchRecordAction("expense recorded"))}
          style={styles.button}
        >
          <Text style={styles.text}>Recorded</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemslayout: {
    // borderWidth: 1,

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
