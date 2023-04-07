import { View, Text } from "react-native";
import React, { useEffect } from "react";
import DisplayData from "../Statistic/DisplayData";
import { useLogin } from "../../context/LoginProvider";
import { useDispatch, useSelector } from "react-redux";
import client from "../../api/client";
import { ScreenAction } from "../../../Redux/actions";
import ChangeDate from "../locations/ChangeDate";

export default function Statistics() {
  const { setIsLoggedIn, profile } = useLogin();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ScreenAction("Statistics"));
  }, []);

  return (
    <View>
      <DisplayData email={profile.email} />
    </View>
  );
}
