import * as actionTypes from '../actions/actionTypes';

const initialState = {
  windSpeed: 12,
  windText: '',
  userName: '',
  city: '',
  currentDate: '',
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
  return state;
}

export default rootReducer;