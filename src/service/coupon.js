import request from "./request";

// 查询所有优惠券信息
export function getCouponList() {
  return request({
    url: `/foodservice/coupon/getCouponList`,
    method: "get",
  });
}

// 添加优惠券信息
export function addCoupon(coupon) {
  return request({
    url: `/foodservice/coupon/addCoupon`,
    method: "post",
    data: coupon,
  });
}

// 删除优惠券信息
export function deleteCoupon(couponId) {
  return request({
    url: `/foodservice/coupon/deleteCoupon/${couponId}`,
    method: "delete",
  });
}
