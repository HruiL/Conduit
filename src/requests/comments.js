import RequestManage from "@src/utils/requestManage";
// 请求评论列表
export const requestComments = (slug) => {
  return RequestManage.instance.request({
    url: `/articles/${slug}/comments`,
  });
};
// 发表评论
export const publishComment = (slug, comment) => {
  return RequestManage.instance.request({
    url: `/articles/${slug}/comments`,
    method: "post",
    data: {
      comment: {
        body: comment,
      },
    },
  });
};
// 删除评论
export const delComment = (slug, id) => {
  return RequestManage.instance.request({
    url: `/articles/${slug}/comments/${id}`,
    method: "delete",
  });
};
