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

const { width, height } = Dimensions.get("window");

export default function AddBill({ email, getBills }) {
  const [bill, onChangeBill] = useState("");
  const [billPrice, onChangeBillPrice] = useState("");
  const [due_date, onChangeDate] = useState("");
  const [frequency, onChangeFrequency] = useState("");

  const onCheck_billPrice = (value) => {
    const parsedQty = Number.parseInt(value);
    if (Number.isNaN(parsedQty)) {
      onChangeBillPrice(""); //setter for state
    } else if (parsedQty > 0) {
      onChangeBillPrice(parsedQty);
    } else if (parsedQty == 0) {
      onChangeBillPrice("");
      console.log("not valid");
    }
  };

  const onCheck_due_date = (value) => {
    const parsedQty = Number.parseInt(value);
    if (Number.isNaN(parsedQty)) {
      onChangeDate(""); //setter for state
    } else if (parsedQty > 0 && parsedQty <= 31) {
      onChangeDate(parsedQty);
    } else {
      console.log("BETWEEN 1 - 31");
    }
  };

  const onCheck_frequency = (value) => {
    const parsedQty = Number.parseInt(value);
    if (Number.isNaN(parsedQty)) {
      onChangeFrequency(""); //setter for state
    } else if (parsedQty > 0) {
      onChangeFrequency(parsedQty);
    } else {
      console.log("not valid frequency");
    }
  };

  const add = async () => {
    console.log("bill: " + bill.length);
    console.log("billPrice: " + billPrice);
    console.log("due_date: " + due_date);
    console.log("frequency: " + frequency);

    let billInfo = {
      bill: bill,
      bill_price: billPrice,
      due_date: due_date,
      frequency: frequency,
    };

    if (
      bill.length > 0 &&
      billPrice !== "" &&
      due_date !== "" &&
      frequency !== ""
    ) {
      console.log("--------------Upload to Server---------------");
      const res = await client.post("/add-bill", {
        email: email,
        billInfo: billInfo,
      });
    }

    getBills(); //11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
  };

  return (
    <View style={styles.addbill}>
      <TouchableOpacity onPress={add}>
        <Text style={styles.prefix}>AddBill</Text>
      </TouchableOpacity>
      <View style={styles.itemslayout}>
        <View style={styles.section}>
          <Text style={styles.prefix}>Bill:</Text>
          <TextInput
            style={styles.middle}
            onChangeText={onChangeBill}
            placeholder="Bill info"
            value={bill}
          />
          <Text style={styles.last}></Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.prefix}>$:</Text>
          <TextInput
            style={styles.middle}
            onChangeText={(e) => onCheck_billPrice(e)}
            value={billPrice.toString()}
            placeholder="price"
            keyboardType="numeric"
          />
          <Text style={styles.last}>( number )</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.prefix}>date:</Text>
          <TextInput
            style={styles.middle}
            onChangeText={(e) => onCheck_due_date(e)}
            value={due_date.toString()}
            placeholder="DUE DATE"
            keyboardType="numeric"
          />
          <Text style={styles.last}  >{due_date.toString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.prefix}>every:</Text>
          <TextInput
            style={styles.middle}
            onChangeText={(e) => onCheck_frequency(e)}
            value={frequency.toString()}
            placeholder="every"
            keyboardType="numeric"
          />
          <Text style={styles.last}>month(s)</Text>
        </View>
      </View>
      {/* <Checkbox value={isSelected} onValueChange={setSelection} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  addbill: {
    // flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    //   justifyContent: "center",
    width: width * 0.7,

    borderWidth: 4,
    borderColor: "rgba(0, 191, 255, 0.1)",
    borderRadius: 25,
    // borderRadius: 50,
    elevation: 20,
  },
  itemslayout: {
    // flexDirection: "row",
    margin: 10,
    flexWrap: "wrap",
    backgroundColor: "aliceblue",
    borderRadius:25,
    // alignItems: "stretch",
    justifyContent: "center",
    padding:7
  },
  section: {
    flexDirection: "row",
    margin: 3,
  },
  prefix: {
    // borderWidth: 1,
    // borderColor: "rgba(0, 171, 0, 0.1)",
    width: "20%",
    alignSelf: "center",
    textAlign: "center",
  },
  middle: {
    borderWidth: 1,
    borderColor: "rgba(255, 0, 0, 0.1)",
    width: "50%",

    // marginRight: 10,
    alignSelf: "center",
  },
  last: {
    // borderWidth: 1,
    // borderColor: "rgba(0, 171, 0, 0.1)",
    width: "30%",
    alignSelf: "center",
    textAlign: "center",
  },
});
