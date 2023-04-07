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
import React from "react";
import AddBill from "../Bills/AddBill";
import { useLogin } from "../../context/LoginProvider";
import ShowBills from "../Bills/ShowBills";
import { useState, useEffect } from "react";
import client from "../../api/client";
import { useDispatch } from "react-redux";
import { ScreenAction } from "../../../Redux/actions";

export default function Bills() {
  const { setIsLoggedIn, profile } = useLogin();

  const [bills, setBills] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ScreenAction("Bills"));
  }, []);

  const getBills = async () => {
    //11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    setBills([]); //CLean up data

    const res = await client.post("/bills", {
      email: profile.email,
    });

    const res_array = res.data.location;
    res_array.map((each) => setBills((prev) => [...prev, each]));
  };

  return (
    <View style={styles.container}>
      <AddBill email={profile.email} getBills={getBills} />

      <ShowBills email={profile.email} bills={bills} getBills={getBills} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",

    // borderWidth: 5,
    // borderColor: "thistle",
    // borderRadius: 50,
  },
});
