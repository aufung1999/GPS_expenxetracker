export const trackingPositionAction = (data) => {
    return {
      type: "tracking",
      payload: data
    };
  };


export const locationsAction = (data) => {
    return {
      type: "store_location",
      payload: data
    };
  };

