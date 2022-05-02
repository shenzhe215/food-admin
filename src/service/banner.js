import request from "./request";

// 查询所有banner
export function pageBanner(page, limit) {
  return request({
    url: `/cmsservice/banneradmin/pageBanner/${page}/${limit}`,
    method: "get",
  });
}

// 条件查询所有banner
export function pageConditionBanner(page, limit, banner) {
  return request({
    url: `/cmsservice/banneradmin/pageConditionBanner/${page}/${limit}`,
    method: "post",
    data: banner,
  });
}
// 添加banner信息
export function addBanner(banner) {
  return request({
    url: `/cmsservice/banneradmin/addBanner`,
    method: "post",
    data: banner,
  });
}

// 查询所有优惠券信息
export function updateBanner(banner) {
  return request({
    url: `/cmsservice/banneradmin/update`,
    method: "put",
    data: banner,
  });
}

// 查询所有优惠券信息
export function removeBanner(id) {
  return request({
    url: `/cmsservice/banneradmin/remove/${id}`,
    method: "delete",
  });
}
