import RequestManage from "@src/utils/requestManage";
// 获取文章列表
export function requestArticles(params = {}) {
  return RequestManage.instance.request({ url: "/articles", params });
}
// 获取用户关注的作者的文章列表
export function requestFollowAuthorArticles(params = {}) {
  return RequestManage.instance.request({ url: "/articles/feed", params });
}
// 点赞文章
export function favoriteActicle(slug) {
  return RequestManage.instance.request({
    url: `/articles/${slug}/favorite`,
    method: "post",
  });
}
// 文章取消点赞
export function unFavoriteArticle(slug) {
  return RequestManage.instance.request({
    url: `/articles/${slug}/favorite`,
    method: "delete",
  });
}
// 根据句slug获取文章详情
export function requestArticleDetailBySlug(slug) {
  return RequestManage.instance.request({
    url: `/articles/${slug}`,
  });
}
// 发布文章
export function publishArticleRequest(article) {
  return RequestManage.instance.request({
    url: "/articles",
    method: "post",
    data: article,
  });
}
// 修改文章
export function editArticleRequest(slug, article) {
  return RequestManage.instance.request({
    url: `/articles/${slug}`,
    method: "put",
    data: { article },
  });
}
// 删除文章
export function delArticleRequest(slug) {
  return RequestManage.instance.request({
    url: `/articles/${slug}`,
    method: "delete",
  });
}
