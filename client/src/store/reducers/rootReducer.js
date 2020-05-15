import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userName: "",
  userId: "",
  errorMessage: "",
  itemsToBeDone: [],
  itemsInProgress: [],
  itemsDone: [],
  weatherData: {},
  location: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.addItemsToBeDone:
      return {
        ...state,
        itemsToBeDone: [...state.itemsToBeDone, action.payload.item],
      };
    case actionTypes.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case actionTypes.setWeatherData:
      return {
        ...state,
        weatherData: action.payload.weatherData,
      };
    case actionTypes.setLocation:
      return {
        ...state,
        location: action.payload.location,
      };
    case actionTypes.setUserData:
      return {
        ...state,
        userName: action.payload.name,
        userId: action.payload.id,
      };
    default:
      return state;
  }
};

export default rootReducer;
