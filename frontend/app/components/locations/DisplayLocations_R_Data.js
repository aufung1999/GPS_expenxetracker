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
  location_exp,
  setExpense,
}) {
  function currentTextInput(e, _id) {
    console.log("index: " + _id);
    console.log("e.target.value: " + e);

    setExpense({ ...location_exp, [_id]: e });
  }

  return (
    <View style={styles.item} key={each._id}>
      <Text style={styles.locationName}>{each.name}</Text>
      <TextInput
        style={styles.inputMoney}
        onChangeText={(e) => currentTextInput(e, each._id)}
        value={
          location_exp[each._id] != undefined ? location_exp[each._id] : ""
        }
        placeholder="Spent$"
        keyboardType="numeric"
      />
      {each.expense && <Text>{each.expense}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "rgba(248, 248, 255, 1.0)",
    width: "40%",
    minHeight: 100, //make it dynamic for the rendere <Text>
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
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
