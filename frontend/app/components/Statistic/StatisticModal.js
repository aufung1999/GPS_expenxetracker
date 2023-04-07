import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useState } from "react";
import GestureRecognizer from "react-native-swipe-gestures";
import client from "../../api/client";

const { width, height } = Dimensions.get("window");

export default function StatisticModal({ dailyExpense, each_date, email }) {
  const [visible, setVisible] = useState(false);
  const [statistics, setStatistics] = useState([]);

  const getDate_Expenses = async () => {
    const res = await client.post("/date-statistics", {
      email: email,
      get: true,
      each_date: each_date,
    });

    const res_array = res.data.date_expenses;
    res_array?.map((each) => setStatistics((prev) => [...prev, each]));
  };

  const show = () => {
    getDate_Expenses();
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
    setStatistics([]);
  };

  return (
    <View>
      <TouchableOpacity onPress={show}>
        {dailyExpense[each_date] && <Text>${dailyExpense[each_date]}</Text>}
      </TouchableOpacity>
      <GestureRecognizer style={{ flex: 1 }} onSwipeDown={hide}>
        <Modal
          transparent={true}
          visible={visible}
          animationType="slide"
          // presentationStyle="formSheet"
        >
          <View style={[styles.centeredView]}>
            <View style={[styles.itemslayout, styles.modalperimeter]}>
              <View style={[styles.items]}>
                {statistics &&
                  statistics.map((each, index) => (
                    <View
                      key={"statistic-" + index}
                      style={[styles.item, styles.elevation]}
                    >
                      <Text>{each.name}</Text>
                      <Text>${each.expense}</Text>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  itemslayout: {
    borderColor: "rgba(128, 128, 128, 0.4)",
    borderWidth: 5,
    borderRadius: 25,

    minWidth: "10%",
    minHeight: "10%",

    backgroundColor: "rgba(248, 248, 255, 0.9)",
    // alignItems: "center",
    // justifyContent: "center",
  },

  modalperimeter: {
    shadowColor: "black",
    shadowOpacity: 1.0,
    shadowRadius: 5,
    elevation: 7,
  },

  items: {
    margin: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    minWidth: "80%",
  },

  item: {
    backgroundColor: "rgba(248, 248, 255, 0.5)",
    width: "40%",
    // height: 100,     //make it dynamic for the rendere <Text>
    margin: 5,
    alignItems: "center",
    // justifyContent: "center",
  },
  elevation: {
    elevation: 20,
    shadowColor: "lavender ",
  },
});
