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

export default function DisplayLocations_R_Months({
  ind,
  data,
  each_year,
  each_month,
  expand,
  expandMonth,
  totalExpense,
  DATES,
  numbers,
  setNumbers,
}) {
  return (
    <View key={"View" + each_month + ind}>
      <Button
        title={each_month}
        onPress={() => expand(each_month)}
      />
      <Text >
        {each_month} Expense: {totalExpense[each_month]}
      </Text>
      {DATES?.map(
        (each_date, i) =>
          expandMonth.includes(each_month) &&
          each_year == each_date.substr(0, 4) &&
          each_month == each_date.substr(0, 7) && (
            <View key={each_date + i}>
              <Text >{each_date}</Text>
              <View style={styles.dateContainer} >
                {data?.map(
                  (each, index) =>
                    each_date == each.date && (
                      <DisplayLocations_R_Data
                        each={each}
                        index={index}
                        numbers={numbers}
                        setNumbers={setNumbers}
                        key={"date"+i}
                      />
                    )
                )}
              </View>
            </View>
          )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
