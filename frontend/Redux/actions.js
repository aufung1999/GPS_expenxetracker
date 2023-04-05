export const currentPositionAction = (data) => {
  return {
    type: "tracking",
    payload: data,
  };
};

//***************************************************** */

export const locationsAction_add = (data) => {
  return {
    type: "store_location",
    payload: data,
  };
};

export const locationsAction_remove = (data) => {
  return {
    type: "remove_location",
    payload: data,
  };
};

export const locationsAction_countTime = (data) => {
  return {
    type: "count_time",
    payload: data,
  };
};

export const locationsAction_passed = () => ({
  type: "passed_locations",
});

//***************************************************** */
export const switchRecordAction = (data) => ({
  type: "switch-Record",
  payload: data,
});
//***************************************************** */
export const dateRecordAction = (data) => ({
  type: "date-Record",
  payload: data,
});
//***************************************************** */
export const ScreenAction = (data) => ({
  type: "Screen changed",
  payload: data,
});
