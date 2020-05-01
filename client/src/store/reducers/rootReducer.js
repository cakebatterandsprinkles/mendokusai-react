import * as actionTypes from '../actions/actionTypes';

const initialState = {
  windSpeed: 12,
  windText: '',
  userName: '',
  city: '',
  currentDate: '',
  errorMessage: '',
  itemsToBeDone: [],
  itemsInProgress: [],
  itemsDone: []
}

const rootReducer = (state = initialState, action) => {
  if (action.type === actionTypes.addItemsToBeDone) {
    return {
      ...state,
      itemsToBeDone: [...state.itemsToBeDone, action.payload.item]
    }
  }
  if (action.type === actionTypes.setErrorMessage) {
    return {
      ...state,
      errorMessage: action.payload.errorMessage
    }
  }
  return state;
}

export default rootReducer;