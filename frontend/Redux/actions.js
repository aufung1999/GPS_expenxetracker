export const currentPositionAction = (data) => {
  return {
    type: "tracking",
    payload: data,
  };
};

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
