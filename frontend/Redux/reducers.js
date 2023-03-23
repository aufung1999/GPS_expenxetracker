import React from "react";
import { combineReducers } from "redux";

//######################################################################################################

const isEditLangBtnReducer = (state = true, action) => {
  switch (action.type) {
    case "EditLangBtnClicked":
      return !state;
    default:
      return state;
  }
};
//######################################################################################################

const currentPositionReducer = (state = null, action) => {
  switch (action.type) {
    case "tracking":
      return action.payload;
    default:
      return state;
  }
};

//######################################################################################################

const locationsReducer = (state = [], action) => {
  switch (action.type) {
    case "store_location":
      if (state.length == 0) {
        return [...state, action.payload];
      } else {
        const existInState = state.some(
          (each) => each.place_id == action.payload.place_id
        );
        return existInState ? state : [...state, action.payload];
      }

    case "remove_location":
      return state.filter((each) => each.place_id == action.payload.place_id);
    case "count_time":
      const isFind = state.find(
        (each) => each.place_id == action.payload.place_id
      );
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      // console.log(isFind.count);
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      isFind.count = isFind.count + 1;
      return state;

    case "passed_locations":
      return [];
    default:
      return state;
  }
};

//######################################################################################################

const reducers = combineReducers({
  isEditLangBtn: isEditLangBtnReducer,

  currentPosition: currentPositionReducer,

  locations: locationsReducer,
});

export default reducers;
