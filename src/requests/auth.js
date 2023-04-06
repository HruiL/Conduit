import RequestManage from "@src/utils/requestManage";

// 注册请求
export function registerUser(user) {
  return RequestManage.instance.request({
    url: "/users",
    method: "post",
    data: { user },
  });
}
// 登录请求
export function loginRequest(user) {
  return RequestManage.instance.request({
    url: "/users/login",
    method: "post",
    data: { user },
  });
}
