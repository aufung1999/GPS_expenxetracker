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

const trackingPositionReducer = (state = null, action) => {
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
      }
      state.map((each) => {
        if (each.place_id == action.payload.place_id) {
          return state;
        } else if (each.place_id != action.payload.place_id) {
          return [...state, action.payload];
        }
      });
    default:
      return state;
  }
};

//######################################################################################################

const reducers = combineReducers({
  isEditLangBtn: isEditLangBtnReducer,

  trackingPosition: trackingPositionReducer,

  locations: locationsReducer,
});

export default reducers;
