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
import client from "../../api/client";
import { useSelector } from "react-redux";
import { Pressable } from "react-native";

const { width, height } = Dimensions.get("window");

export default function DisplayLocations_NR({ email }) {
  const [data, setData] = useState([]);
  const [location_exp, setExpense] = useState({});

  const switchRecord = useSelector((state) => state.switchRecord);
  const Screen = useSelector((state) => state.Screen);

  const getData = async () => {
    // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

    setData([]); //CLean up data
    setExpense({}); //CLean up number

    const res = await client.post("/locations", {
      email: email,
      switchRecord: switchRecord,
    });

    const res_array = res.data.location;

    res_array.map((each) => {
      each.expense == undefined ? setData((prev) => [...prev, each]) : null; //This is the main part select those WHiCh DO not have expense recorded
    });
  };

  useEffect(() => {
    getData(); // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
  }, []);

  // console.log(data);
  function currentTextInput(e, _id) {
    console.log("index: " + _id);
    console.log("e.target.value: " + e);

    setExpense({ ...location_exp, [_id]: e });
  }

  const submit = async () => {
    const res = await client.post("/store-expense", {
      email: email,
      location_exp: location_exp,
    });

    console.log(res.data);

    getData(); // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
  };

  const remove = async (e, _id) => {
    console.log("removed");
    console.log(_id);

    const res = await client.post("/remove-location", {
      email: email,
      _id: _id,
    });

    console.log(res.data);

    const filtered_data = data.filter((each) => each._id != _id);

    setData(filtered_data);
  };

  return (
    <View>
      <Pressable onPress={submit} style={styles.button}>
        <Text style={styles.text}>submit</Text>
      </Pressable>
      <ScrollView contentContainerStyle={styles.itemslayout}>
        {data?.map((each, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.locationName}>{each.name}</Text>
            {/* <Text >{each._id}</Text> */}
            <TextInput
              style={styles.inputMoney}
              onChangeText={(e) => currentTextInput(e, each._id)}
              value={
                location_exp[each._id] != undefined
                  ? location_exp[each._id]
                  : ""
              }
              placeholder="Spent$"
              keyboardType="numeric"
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={(e) => remove(e, each._id)}
              style={styles.removeButton}
            >
              <Text>remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemslayout: {
    flex: 1,
    width: width,
    height: height,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#D3D3D3",
    // alignItems: "center",
    justifyContent: "center",
  },

  item: {
    backgroundColor: "rgba(248, 248, 255, 1.0)",
    width: "40%",
    height: 100, //make it dynamic for the rendere <Text>
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  elevation: {
    elevation: 15,
    shadowColor: "lavender ",
  },

  //----------------SUBMIT BUTTON-----------------------------------------------------------------------------------------
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

  //-----------------------------------------------------------------------------
  locationName: {
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
