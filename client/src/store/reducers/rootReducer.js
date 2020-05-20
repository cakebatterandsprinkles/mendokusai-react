import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userName: "",
  errorMessage: "",
  todayTodos: [],
  weatherData: {},
  location: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
      };
    case actionTypes.setTodayList:
      return {
        ...state,
        todayTodos: [
          ...action.payload.todos.sort((a, b) => (a._id > b._id ? 1 : -1)),
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;
