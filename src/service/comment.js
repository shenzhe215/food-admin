import request from "./request";
// 删除菜品评论
export function deleteCommentById(id) {
  return request({
    url: `/foodservice/commentfront/deleteComment/${id}`,
    method: "delete",
  });
}

// 获取菜品评论列表
export function getCommentListById(foodId) {
  return request({
    url: `/foodservice/commentfront/getCommentListById/${foodId}`,
    method: "get",
  });
}
