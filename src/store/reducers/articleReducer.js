import { mapArrayToDictionary } from "@src/utils/mapArrayToDictionary";
import * as types from "../types/article.type";
const initialState = {
  activeTabName: "Global Feed",
  // 文章列表
  articles: {
    result: {},
    status: "idle",
    error: null,
  },
};
export function articleReducer(state = initialState, action) {
  switch (action.type) {
    // 设置tab高亮
    case types.SET_UP_ACTIVE_TAB_NAME:
      return { ...state, activeTabName: action.payload };
    // 请求文章
    case types.REQUEST_ARTICLES:
      return { ...state, articles: { ...state.articles, status: "pending" } };
    // 请求文章列表成功 并保存文章列表
    case types.REQUEST_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: {
          ...state.articles,
          status: "success",
          result: mapArrayToDictionary(action.payload, "slug"),
        },
      };
    // 请求文章列表失败
    case types.REQUEST_ARTICLES_ERROR:
      return {
        ...state,
        articles: { ...state.articles, status: "error", error: action.error },
      };
    // 更新本地文章
    case types.UPDATE_ARTICLE:
      // 如果本地文章列表里没有要更新的文章 就return全有状态state 不需要继续往下执行
      if (typeof state.articles.result[action.payload.slug] === "undefined")
        return state;
      return {
        ...state,
        articles: {
          ...state.articles,
          result: {
            ...state.articles.result,
            [action.payload.slug]: action.payload,
          },
        },
      };
    default:
      return state;
  }
}
