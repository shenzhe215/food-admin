import request from "./request";

export function getAllFood() {
  return request({
    url: "/foodservice/food/list",
    method: "get",
  });
}

// 分页查询
export function getFoodPage(current, limit) {
  return request({
    url: `/foodservice/food/pageFood/${current}/${limit}`,
    method: "get",
  });
}

// 带条件查询
export function getFoodCondition(foodQuery) {
  return request({
    url: `/foodservice/food/foodCondition`,
    method: "post",
    data: foodQuery,
  });
}

// 分页带条件查询
export function getFoodPageCondition(current, limit, foodQuery) {
  return request({
    url: `/foodservice/food/pageFoodCondition/${current}/${limit}`,
    method: "post",
    data: foodQuery,
  });
}

// 添加菜品信息
export function addFoodInfo(foodInfo) {
  return request({
    url: `/foodservice/food/addFoodInfo`,
    method: "post",
    data: foodInfo,
  });
}

// 根据菜品id查询菜品的基本信息
export function getFoodById(id) {
  return request({
    url: `/foodservice/food/getFoodInfo/${id}`,
    method: "get",
  });
}

// 修改菜品信息
export function updateFoodInfo(foodInfoVo) {
  return request({
    url: "/foodservice/food/updateFoodInfo",
    method: "post",
    data: foodInfoVo,
  });
}

//1 菜品列表（条件查询分页）
//current当前页 limit每页记录数 courseQuery条件对象
export function getFoodListPage(current, limit, foodQuery) {
  return request({
    //url: '/eduservice/course/pagecourseCondition/'+current+"/"+limit,
    url: `/foodservice/food/pageFoodCondition/${current}/${limit}`,
    method: "post",
    //foodQuery条件对象，后端使用RequestBody获取数据
    //data表示把对象转换json进行传递到接口里面
    data: foodQuery,
  });
}

// 删除菜品信息
export function deleteFoodId(id) {
  return request({
    url: `/foodservice/food/${id}`,
    method: "delete",
  });
}

// 获得菜品分类
export function getAllType() {
  return request({
    url: `/foodservice/type/getAllType`,
    method: "get",
  });
}

// 获得菜品分类
export function getTypeByTitle(type) {
  return request({
    url: `/foodservice/type/getTypeByTitle`,
    method: "post",
    data: type,
  });
}

// 获得菜品分类
export function removeType(id) {
  return request({
    url: `/foodservice/type/removeType/${id}`,
    method: "delete",
  });
}

// 获得菜品分类
export function updateType(type) {
  return request({
    url: `/foodservice/type/updateType`,
    method: "post",
    data: type,
  });
}

// 获得菜品分类
export function addType(type) {
  return request({
    url: `/foodservice/type/addType`,
    method: "post",
    data: type,
  });
}
