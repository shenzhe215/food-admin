import { Map } from "immutable";

import * as actionTypes from "./constants";

const defaultState = Map({
  foodList: [],
  typeList: [],
  currentFood: "",
  foodInfo: {},
  cover:"",
  total: 0,
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_FOOD_LIST:
      return state.set("foodList", action.foodList);
    case actionTypes.GET_TYPE_LIST:
      return state.set("typeList", action.typeList);
    case actionTypes.CHANGE_FOOD_COVER:
      return state.set("cover", action.cover);
    case actionTypes.CHANGE_FOOD_INFO:
      return state.set("foodInfo", action.foodInfo);
    case actionTypes.GET_TOTAL:
      return state.set("total", action.total);
    default:
      return state;
  }
}

export default reducer;
