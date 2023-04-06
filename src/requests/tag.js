import RequestManage from "@src/utils/requestManage";
// 请求tags
export function requestTags() {
  return RequestManage.instance.request({
    url: "/tags",
  });
}
