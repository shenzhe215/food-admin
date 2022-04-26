import {
  getAllFood,
  getAllType,
  getFoodById,
  getFoodListPage,
  addFoodInfo,
  deleteFoodId,
  updateFoodInfo,
  getFoodPage,
  getFoodPageCondition,
} from "@/service/food";

import * as actionTypes from "./constants";

export const changeFoodListAction = (foodList) => ({
  type: actionTypes.GET_FOOD_LIST,
  foodList,
});

const changeTypeListAction = (typeList) => ({
  type: actionTypes.GET_TYPE_LIST,
  typeList,
});

const changeTotalAction = (total) => ({
  type: actionTypes.GET_TOTAL,
  total,
});


// 修改食品封面
export const changeFoodCoverAction = (cover) => ({
  type: actionTypes.CHANGE_FOOD_COVER,
  cover,
});

export const changeFoodInfoAction = (foodInfo) => ({
  type: actionTypes.CHANGE_FOOD_INFO,
  foodInfo,
});

export const getFoodListAction = () => {
  return (dispatch, getState) => {
    getAllFood().then((res) => {
      const newFoodList = res.data.list;
      dispatch(changeFoodListAction(newFoodList));
    });
  };
};

// 分页查询
export const getFoodListPageAction = (current, limit) => {
  return (dispatch, getState) => {
    getFoodPage(current, limit).then((res) => {
      const newFoodList = res.data.list;
      dispatch(changeFoodListAction(newFoodList));
      dispatch(changeTotalAction(res.data.total));
    });
  };
};

// 分页条件查询
export const getFoodListPageConditionAction = (current, limit, foodQuery) => {
  return (dispatch, getState) => {
    getFoodPageCondition(current, limit, foodQuery).then((res) => {
      const newFoodList = res.data.list;
      dispatch(changeFoodListAction(newFoodList));
      dispatch(changeTotalAction(res.data.total));
    });
  };
};


export const getTypeListAction = () => {
  return (dispatch, getState) => {
    getAllType().then((res) => {
      const newTypeList = res.data.list;
      dispatch(changeTypeListAction(newTypeList));
    });
  };
};

export const addFoodInfoAction = () => {
  return (dispatch, getState) => {
    addFoodInfo(getState.foodInfo);
  };
};

export const removeFoodAction = (foodId) => {
  return (dispatch, getState) => {
    deleteFoodId(foodId);
  };
};

// 根据id查询菜品信息
export const getFoodInfoByIdAction = (foodId) => {
  return (dispatch) => {
    getFoodById(foodId).then((res) => {
      const newFoodInfo = res.data.item;
      dispatch(changeFoodInfoAction(newFoodInfo));
    });
  };
};
