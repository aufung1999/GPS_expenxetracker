import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppForm from "./components/login/AppForm";
import ImageUpload from "./components/login/ImageUpload";
import UserProfile from "./components/login/UserProfile";
import { useLogin } from "./context/LoginProvider";
import DrawerNavigator from "./DrawerNaviagtor";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm" />
      <Stack.Screen component={ImageUpload} name="ImageUpload" />
      <Stack.Screen component={UserProfile} name="UserProfile" />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  isLoggedIn && console.log(" ITSSSSSSSSSSSSSSS HEREEEEEEEEEEEEEEEEEEEEEEE");
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};
export default MainNavigator;
