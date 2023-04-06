import RequestManage from "@src/utils/requestManage";

// 关注作者
export function followAuthor(username) {
  return RequestManage.instance.request({
    url: `/profiles/${username}/follow`,
    method: "post",
  });
}
// 取消关注作者
export function unFollowAuthor(username) {
  return RequestManage.instance.request({
    url: `/profiles/${username}/follow`,
    method: "delete",
  });
}
