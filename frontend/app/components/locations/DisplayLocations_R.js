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
import DisplayLocations_R_Months from "./DisplayLocations_R_Months";
import { Pressable } from "react-native";

const { width, height } = Dimensions.get("window");

export default function DisplayLocations_R({ email }) {
  const [data, setData] = useState([]);
  const [location_exp, setExpense] = useState({});
  const [totalExpense, setTotalExpense] = useState({});

  const [DATES, setDATES] = useState([]);
  const [MONTHS, setMONTHS] = useState([]);
  const [YEARS, setYEARS] = useState([]);

  const [count, setCount] = useState({});
  const [expandMonth, setExpandMonth] = useState([]);

  const dateRecord = useSelector((state) => state.dateRecord);
  const switchRecord = useSelector((state) => state.switchRecord); //as the default of DATESRecorder has "Today", so it is never undefined
  const Screen = useSelector((state) => state.Screen);

  const getData = async () => {
    // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    setData([]); //CLean up data
    setDATES([]); //CLean up data
    let dates = []; //CLean up
    let months = []; //CLean up
    let years = []; //CLean up

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

        //4. get the YEARS for the categorization
        // using substr method to get the MONTH
        if (years.includes(each.date.substr(0, 4)) === false) {
          years.push(each.date.substr(0, 4));
        }
      }
    });
    console.log("years: " + years);
    console.log("months: " + months);
    setDATES(dates);
    setMONTHS(months);
    setYEARS(years);
  };

  const calMonthExpense = () => {
    let totalepenses = {};
    let annualExpense = [];

    YEARS.map((each_year) => {
      MONTHS.map((each_month) => {
        let monthExpenses = [];
        // console.log(":::::::::: ");
        data.map((each) => {
          each["date"].substr(0, 4) === each_year &&
          each["date"].substr(0, 7) === each_month
            ? //get the MONTHLY expenses
              (monthExpenses.push(parseInt(each["expense"])),
              //get the ANNUAlLY expenses
              annualExpense.push(parseInt(each["expense"])),
              Object.assign(totalepenses, {
                [each_month]: monthExpenses.reduce((a, b) => a + b),
              }))
            : null;
        });
        Object.assign(totalepenses, {
          [each_year]: annualExpense.reduce((a, b) => a + b),
        });
      });
    });
    // console.log("totalExpense: " + JSON.stringify(totalExpense, null, 1));
    setTotalExpense(totalepenses);
  };

  useEffect(() => {
    getData(); // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
  }, [dateRecord, Screen]);

  useEffect(() => {
    calMonthExpense();
  }, [MONTHS, YEARS, dateRecord]);

  const expand = (each_month) => {
    //think about more base cases

    if (count[each_month] == undefined) {
      setCount({ ...count, [each_month]: 1 });
      setExpandMonth((prev) => [...prev, each_month]);
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

  const submit = async () => {
    const res = await client.post("/store-expense", {
      email: email,
      location_exp: location_exp,
    });
    console.log(res.data);

    getData(); // 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

    // const find_data = data.find((each) =>
    //   Object.keys(location_exp).includes(each._id)
    // );
    // find_data["expense"] = location_exp[find_data._id];

    // setData((existingItems) => {
    //   return existingItems.map((each) => {
    //     return Object.keys(location_exp).includes(each._id) ? find_data : each;
    //   });
    // });

    setExpense({});
  };

  return (
    <View>
      <Pressable onPress={submit} style={styles.button}>
        <Text style={styles.text}>submit</Text>
      </Pressable>
      <ChangeDate />
      <ScrollView contentContainerStyle={styles.itemslayout}>
        {/* THIS IS FOR ***DAILY*** dateRecord MODE */}
        {dateRecord === "TODAY" &&
          DATES?.map((each_date, i) => (
            <View key={each_date + i}>
              <Text>{each_date}</Text>
              <View style={styles.dateContainer}>
                {data?.map(
                  (each, index) =>
                    each_date == each.date && (
                      <DisplayLocations_R_Data
                        each={each}
                        index={index}
                        location_exp={location_exp}
                        setExpense={setExpense}
                        key={"DAILYadssadassda" + each._id}
                      />
                    )
                )}
              </View>
            </View>
          ))}
        {/* THIS IS FOR ***MONTHLY*** dateRecord MODE */}
        {dateRecord === "1 MONTH" &&
          MONTHS?.map((each_month, ind) => (
            <DisplayLocations_R_Months
              ind={ind}
              data={data}
              totalExpense={totalExpense}
              expand={expand}
              expandMonth={expandMonth}
              each_month={each_month}
              DATES={DATES}
              location_exp={location_exp}
              setExpense={setExpense}
              dateRecord={dateRecord}
              key={"MONTHLY" + ind}
            />
          ))}
        {/* THIS IS FOR ***ANNUALLY*** dateRecord MODE */}
        {dateRecord === "1 YEAR" &&
          YEARS?.map((each_year, INDEX) => (
            <View key={each_year + INDEX}>
              <Text>
                {each_year} Expense: {totalExpense[each_year]}
              </Text>
              {MONTHS?.map(
                (each_month, ind) =>
                  each_year == each_month.substr(0, 4) && (
                    <DisplayLocations_R_Months
                      ind={ind}
                      data={data}
                      totalExpense={totalExpense}
                      expand={expand}
                      expandMonth={expandMonth}
                      each_year={each_year}
                      each_month={each_month}
                      DATES={DATES}
                      location_exp={location_exp}
                      setExpense={setExpense}
                      dateRecord={dateRecord}
                      key={"ANNUALLY" + ind}
                    />
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
});
