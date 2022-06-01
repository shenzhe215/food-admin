import request from "./request";

// 获得验证码
export function getCaptcha() {
  return request({
    url: `/fooducenter/captcha/getCaptcha`,
    method: "get",
  });
}

// 验证验证码
export function verify(captchaVo) {
  return request({
    url: `/fooducenter/captcha/verify`,
    method: "post",
    data: captchaVo,
  });
}

// 登录
export function handleLogin(loginInfo) {
  return request({
    url: `/fooducenter/admin/login`,
    method: "post",
    data: loginInfo,
  });
}
