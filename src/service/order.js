import request from "./request";

// 查询所有订单信息
export function getAllOrder() {
  return request({
    url: "/orderservice/order/getAllOrder",
    method: "get",
  });
}

// 条件查询所有订单信息
export function getOrderCondition(order) {
  return request({
    url: "/orderservice/order/getOrderCondition",
    method: "post",
    data: order,
  });
}

// 条件查询所有订单带详情信息
export function pageConditionOrder(current, limit, orderQuery) {
  return request({
    url: `/orderservice/order/pageConditionOrder/${current}/${limit}`,
    method: "post",
    data: orderQuery,
  });
}

// 条件查询所有订单信息
export function getOrderDetail(id) {
  return request({
    url: `/orderservice/orderDetail/getOrderDetail/${id}`,
    method: "post",
  });
}

// 根据订单类型获取订单
export function getOrderByType(status) {
  return request({
    url: `/orderservice/orderfront/getOrderByType/${status}`,
    method: "get",
  });
}

// 查询发货目录
export function sendOrder(orderId) {
  return request({
    url: `/orderservice/orderfront/sendOrder/${orderId}`,
    method: "get",
  });
}
