import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

export default function MonthlyBarChart({ monthlyExpense }) {
  return (
    <View>
      <Text>MONTHLY</Text>
      <LineChart
        data={{
          labels: monthlyExpense["dates"]?.map( each => each.substr(5,7)),
          datasets: [
            {
              data: monthlyExpense["expenses"],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "rgba(0, 0, 0, 1.0)",
          backgroundGradientFrom: "rgba(52, 53, 58, 0.5)",
          backgroundGradientTo: "rgba(30, 30, 30, 0.1)",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "rgba(52, 53, 58, 1.0)",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
