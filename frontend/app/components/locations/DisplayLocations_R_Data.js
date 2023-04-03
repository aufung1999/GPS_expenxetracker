import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export default function DisplayLocations_R_Data({
  each,
  index,
  numbers,
  setNumbers,
}) {
  function currentTextInput(e, _id) {
    console.log("index: " + _id);
    console.log("e.target.value: " + e);

    setNumbers({ ...numbers, [_id]: e });
  }

  return (
    <View style={styles.item} key={each._id}>
      <Text style={styles.locationName}>{each.name}</Text>
      <TextInput
        style={styles.inputMoney}
        onChangeText={(e) => currentTextInput(e, each._id)}
        value={numbers[each._id] != undefined ? numbers[each._id] : ""}
        placeholder="Spent$"
        keyboardType="numeric"
      />
      {each.expense && <Text>{each.expense}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#7cb48f",
    width: "40%",
    height: height * 0.15,
    margin: 4,
    alignItems: "center",
    // justifyContent: "center",
  },
  //-----------------------------------------------------------------------------

  //-----------------------------------------------------------------------------
  locationName: {
    height: "40%",
    margin: 2,
  },
  inputMoney: {
    // height: "auto",
    width: "50%",
    borderColor: "#D5DDE5",
    borderWidth: 1,
    textAlign: "center",
  },
  //-----------------------------------------------------------------------------
});
