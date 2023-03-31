import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import client from "../../api/client";

export default function DisplayLocations({ email }) {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState("");
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await client.post("/locations", { email: email });

      const res_array = res.data.location;

      res_array.map((each) => {
        setData((prev) => [...prev, each]);
      });
    };
    getData();
  }, []);

  // console.log(data);
  function currentTextInput(e, index) {
    console.log("index: " + index);
    console.log("e.target.value: " + e);

    // const indexInNumbers = numbers.map((each) => each["index"]);

    // console.log("indexInNumbers: " + indexInNumbers);

    if (index in numbers === true) {
      console.log('YES: ')
      numbers["index"] = e
      setNumbers([...numbers, { [index]: e }]);
    } else if (index in numbers === false) {
      setNumbers((prev) => [...prev, { [index]: e }]);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.itemslayout}>
      {console.log("numbers: " + JSON.stringify(numbers, null, 1))}
      {data?.map((each, index) => (
        <View style={styles.item} key={index}>
          <Text style={styles.locationName}>{each.name}</Text>
          <TextInput
            style={styles.inputMoney}
            onChangeText={(e) => currentTextInput(e, index)}
            value={numbers["index"]}
            placeholder="Spent$"
            keyboardType="numeric"
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemslayout: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#D3D3D3",
    alignItems: "center",
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
