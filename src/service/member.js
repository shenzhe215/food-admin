import request from "./request";

export function getMemberList() {
  return request({
    url: `/fooducenter/member/getMemberList`,
    method: "get",
  });
}

export function getMemberConditionList(member) {
  return request({
    url: `/fooducenter/member/getMemberConditionList`,
    method: "post",
    data: member,
  });
}

export function disableMember(id) {
  return request({
    url: `/fooducenter/member/disableMember/${id}`,
    method: "post",
  });
}

export function unDisableMember(id) {
  return request({
    url: `/fooducenter/member/unDisableMember/${id}`,
    method: "post",
  });
}
