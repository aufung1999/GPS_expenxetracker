import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";

import client from "../../api/client";

const { width, height } = Dimensions.get("window");

export default function ShowBills({ email, bills, getBills }) {
  const [isChecked, setChecked] = useState({});

  useEffect(() => {
    getBills(); //11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
  }, []);

  const onCheck_CheckBox = (e, _id) => {
    if (isChecked[_id] === undefined) {
      setChecked({ ...isChecked, [_id]: true });
    }
    if (isChecked[_id] !== undefined) {
      setChecked({ ...isChecked, [_id]: !isChecked[_id] });
    }
  };

  const submit = async () => {
    const res = await client.post("/store-expense", {
      email: email,
      isChecked: isChecked,
    });

    // console.log(res.data);

    getBills(); // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
  };

  return (
    <View>
      <Text style={{ textAlign: "center" }}>ShowBills</Text>
      <Button title="Submit" onPress={submit} />
      <ScrollView contentContainerStyle={styles.itemslayout}>
        {bills?.map((each, index) => (
          <View key={index} style={styles.item}>
            <Text>bill: {each.bill}</Text>
            <Text>bill price: {each.bill_price}</Text>
            <Text>due date: {each.due_date}</Text>
            <Text>Days Left: {each.countDown_days}</Text>
            <Text>every {each.frequency} months</Text>
            <Text>Status: {each.due_status}</Text>
            {each.due_status === "Pay Today" && (
              <Checkbox
                value={isChecked}
                onValueChange={(e) => onCheck_CheckBox(e, each._id)}
                color={isChecked[each._id] ? "#4630EB" : undefined}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemslayout: {
    // flex: 3,
    width: width,
    height: height,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#D3D3D3",
    // alignItems: "center",
    justifyContent: "center",
  },

  item: {
    backgroundColor: "#7cb48f",
    width: "40%",
    // height: 100,     //make it dynamic for the rendere <Text>
    margin: 4,
    alignItems: "center",
    // justifyContent: "center",
  },

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
    // padding:3,
  },
  removeButton: {
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 50,

    width: "50%",
    // height: "50%",
    alignItems: "center",
  },
  //-----------------------------------------------------------------------------
});
