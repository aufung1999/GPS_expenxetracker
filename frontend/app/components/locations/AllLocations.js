import { StyleSheet, View, Text } from "react-native";
import React from "react";
import client from "../../api/client";

export default async function AllLocations({ email }) {
  const res = await client.post("/locations", { email: email });

  res?.map(each => {console.log(each.data)})

//   console.log(res.data);

  return (
    <View style={styles.container}>
      <Text>allLocations</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
