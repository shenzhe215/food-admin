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

// 条件查询所有订单信息
export function getOrderDetail(id) {
  return request({
    url: `/orderservice/orderDetail/getOrderDetail/${id}`,
    method: "post",
  });
}
