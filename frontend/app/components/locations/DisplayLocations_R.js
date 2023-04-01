import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import client from "../../api/client";
import ChangeDate from "./ChangeDate";
import { useSelector } from "react-redux";

export default function DisplayLocations_R({ email }) {
  const [data, setData] = useState([]);
  const [numbers, setNumbers] = useState({});

  const dateRecord = useSelector((state) => state.dateRecord);
  const switchRecord = useSelector((state) => state.switchRecord); //as the default of dateRecorder has "Today", so it is never undefined

  const getData = async () => {  // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    setData([]); //CLean up data
    const res = await client.post("/locations", {
      email: email,
      dateRecord: dateRecord,
      switchRecord: switchRecord,
    });

    const res_array = res.data.location;

    res_array.map((each) => {
      each.expense != undefined ? setData((prev) => [...prev, each]) : null;
    });
  };
  useEffect(() => {
    getData();  // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
  }, [dateRecord]);

  // console.log(data);
  function currentTextInput(e, _id) {
    console.log("index: " + _id);
    console.log("e.target.value: " + e);

    setNumbers({ ...numbers, [_id]: e });
  }

  const submit = async () => {

    const res = await client.post("/store-expense", {
      email: email,
      numbers: numbers,
    });

    console.log(res.data);

    getData(); // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
  };

  return (
    <View>
      <Button title="submit" onPress={submit} />
      <ChangeDate />
      <ScrollView contentContainerStyle={styles.itemslayout}>
        {data?.map((each, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.locationName}>{each.name}</Text>
            {/* <Text >{each._id}</Text> */}
            <TextInput
              style={styles.inputMoney}
              onChangeText={(e) => currentTextInput(e, each._id)}
              value={numbers[each._id] != undefined ? numbers[each._id] : ""}
              placeholder="Spent$"
              keyboardType="numeric"
            />
            {each.expense && <Text>{each.expense}</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemslayout: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#D3D3D3",
    // alignItems: "center",
    justifyContent: "center",
  },

  item: {
    backgroundColor: "#7cb48f",
    width: "40%",
    height: 100,
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
  },
  //-----------------------------------------------------------------------------
});
