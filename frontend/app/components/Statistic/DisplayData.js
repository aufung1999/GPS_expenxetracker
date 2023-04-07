import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import client from "../../api/client";
import MonthlyBarChart from "./MonthlyBarChart";
import Calendar from "./Calendar";
import { ScrollView } from "react-native";
import StatisticModal from "./StatisticModal";

const { width, height } = Dimensions.get("window");

export default function DisplayData({ email }) {
  const Screen = useSelector((state) => state.Screen);

  const [dailyExpense, setDailyExpense] = useState(null);
  const [monthlyExpense, setMonthlyExpense] = useState(null);

  const [calendar, flat_calendar, currentMonth] = Calendar();

  // console.log('calendar: ' + JSON.stringify(flat_calendar , null, 1))

  const getStatistics = async () => {
    //11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    // setStatistics([]); //CLean up data
    setMonthlyExpense(null); //CLean up data
    setDailyExpense(null); //CLean up data

    const res = await client.post("/statistics", {
      email: email,
      get: true,
    });

    //-------------------------For the DailyExpense----------------------------------
    // let dates_array = [];
    // let expenses_array = [];
    const daily_expense = res.data.daily_expense;

    setDailyExpense(daily_expense);
    //-------------------------For the DailyExpense----------------------------------
    //-------------------------For the MonthlyExpense----------------------------------
    let dates_array = [];
    let expenses_array = [];
    const monthly_expense = res.data.monthly_expense;

    for (const date in monthly_expense) {
      dates_array.push(date);
      expenses_array.push(monthly_expense[date]);
    }

    setMonthlyExpense({ dates: dates_array, expenses: expenses_array });
    //-------------------------For the MonthlyExpense----------------------------------


  };

  useEffect(() => {
    const controller = new AbortController();
    getStatistics();
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, []);

  // console.log("monthlyExpense: " + JSON.stringify(monthlyExpense, null, 1));

  return (
    <ScrollView contentContainerStyle={styles.mainlayout}>
      <View style={styles.itemslayout}>
        <Text style={styles.headline}>{currentMonth}</Text>
        {calendar?.map((each_week, i) => (
          <View style={styles.items} key={"each_week-" + i}>
            {each_week["days"].map((each_date, ind) =>
              each_date.substring(5, 7) === currentMonth ? (
                <View style={styles.currentMonth_item} key={"each_date-" + ind}>
                  <Text>{each_date.substring(8)}</Text>
                  <View>
                    {dailyExpense && (
                      <StatisticModal
                        dailyExpense={dailyExpense}
                        each_date={each_date}
                        email={email}
                      />
                    )}
                  </View>
                </View>
              ) : (
                <View
                  style={styles.XcurrentMonth_item}
                  key={"each_date-" + ind}
                ></View>
              )
            )}
          </View>
        ))}
      </View>
      <View style={styles.itemslayout}>
        {monthlyExpense && <MonthlyBarChart monthlyExpense={monthlyExpense} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainlayout: {
    height: height,
  },

  headline: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,

    backgroundColor: "white",

    width: "40%",
    textAlign: "center",

    elevation: 1,
  },

  itemslayout: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    // flex: 3,
    width: width,
    // height: height,
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "rgba(52, 52, 52, 0.8)",
    // alignItems: "center",
    justifyContent: "center",
    // elevation:0,
  },

  items: {
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 50,

    backgroundColor: "",
    width: "90%",
    // height: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    // margin: 3,
    alignItems: "center",
    justifyContent: "center",

    elevation: 2,
  },
  currentMonth_item: {
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",

    flexDirection: "column",
    // flexWrap: "wrap",

    backgroundColor: "rgba(248, 248, 255, 0.3)",
    // shadowColor: "black",
    width: "10%",
    height: 40,
    margin: 2,
    alignItems: "center",
    // justifyContent: "center",

    elevation: 0,
  },
  XcurrentMonth_item: {
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",

    flexDirection: "column",
    // flexWrap: "wrap",

    backgroundColor: "rgba(52, 53, 58, 0.2)",

    shadowColor: "black",
    width: "10%",
    height: 40,
    margin: 2,
    alignItems: "center",
    // justifyContent: "center",
    elevation: 30,
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
