import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import client from "../../api/client";
import ChangeDate from "./ChangeDate";
import { useSelector } from "react-redux";
import DisplayLocations_R_Data from "./DisplayLocations_R_Data";

const { width, height } = Dimensions.get("window");

export default function DisplayLocations_R({ email }) {
  const [data, setData] = useState([]);
  const [numbers, setNumbers] = useState({});

  const [DATES, setDATES] = useState([]);
  const [MONTHS, setMONTHS] = useState([]);

  const [count, setCount] = useState({});
  const [expandMonth, setExpandMonth] = useState([]);

  const dateRecord = useSelector((state) => state.dateRecord);
  const switchRecord = useSelector((state) => state.switchRecord); //as the default of DATESRecorder has "Today", so it is never undefined

  const getData = async () => {
    // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    setData([]); //CLean up data
    setDATES([]); //CLean up data
    let dates = []; //CLean up data
    let months = []; //CLean up data

    const res = await client.post("/locations", {
      email: email,
      dateRecord: dateRecord,
      switchRecord: switchRecord,
    });

    const res_array = res.data.location;

    res_array?.map(async (each) => {
      if (each.expense != undefined) {
        //1. get Data
        setData((prev) => [...prev, each]);

        //2. get the DATE of data for categorization
        // the date IS NOT inside the date_Date
        if (dates.includes(each.date) === false) {
          dates.push(each.date);
        }

        //3. get the MONTHS for the categorization
        // using substr method to get the MONTH
        if (months.includes(each.date.substr(0, 7)) === false) {
          months.push(each.date.substr(0, 7));
        }
      }
    });
    setDATES(dates);
    setMONTHS(months);
  };

  useEffect(() => {
    getData(); // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
  }, [dateRecord]);

  // console.log(data);

  const submit = async () => {
    const res = await client.post("/store-expense", {
      email: email,
      numbers: numbers,
    });

    console.log(res.data);

    getData(); // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
  };

  const expand = (each_month) => {
    if (count[each_month] == undefined) {
      setCount({ ...count, [each_month]: 0 });
    } else if (count[each_month] != undefined) {
      setCount({ ...count, [each_month]: count[each_month] + 1 });
      if (count[each_month] % 2 !== 0) {
        if (expandMonth.includes(each_month)) {
          const hideMonth = expandMonth.filter((each) => each != each_month);
          setExpandMonth(hideMonth);
        }
      }
      if (count[each_month] % 2 === 0) {
        setExpandMonth((prev) => [...prev, each_month]);
      }
    }
  };

  return (
    <View>
      <Button title="submit" onPress={submit} />
      <ChangeDate />
      <ScrollView contentContainerStyle={styles.itemslayout}>
        {MONTHS?.map((each_month, ind) => (
          <View>
            <Button
              title={each_month}
              onPress={() => expand(each_month)}
              key={ind}
            />
            {DATES?.map(
              (each_date, i) =>
                expandMonth.includes(each_month) &&
                each_month == each_date.substr(0, 7) && (
                  <View>
                    <TouchableOpacity>
                      <Text>{each_date}</Text>
                    </TouchableOpacity>
                    <View style={styles.dateContainer} key={i}>
                      {data?.map(
                        (each, index) =>
                          each_date == each.date && (
                            <DisplayLocations_R_Data
                              each={each}
                              index={index}
                              numbers={numbers}
                              setNumbers={setNumbers}
                            />
                          )
                      )}
                    </View>
                  </View>
                )
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemslayout: {
    // flex: 1,
    width: width,
    // height: height,
    // flexDirection: "row",
    // flexWrap: "wrap",
    backgroundColor: "#D3D3D3",
    // alignItems: "center",
  },
  dateContainer: {
    flex: 1,
    // flexDirection: "column",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "thistle",
  },
});
