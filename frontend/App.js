import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "remote-redux-devtools";
import thunk from "redux-thunk";
import reducers from "./Redux/reducers";

import Reactotron from './ReactotronConfig'

if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

const store = createStore(reducers, compose(applyMiddleware(thunk), Reactotron.createEnhancer()) )

import MainNavigator from "./app/MainNavigator";
import LoginProvider from "./app/context/LoginProvider";

export default function App() {
  return (
    <LoginProvider>
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </LoginProvider>
  );
}
