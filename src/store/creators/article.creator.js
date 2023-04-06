import { AxiosError } from "axios";
import * as types from "../types/article.type";
// 设置tab高亮
export const setupActiveTabNameCreator = (activeTabName) => ({
  type: types.SET_UP_ACTIVE_TAB_NAME,
  payload: activeTabName,
});
// 请求文章
export const requestArticlesCreator = (http) => async (dispatch) => {
  // 更新请求状态为pending
  dispatch({ type: types.REQUEST_ARTICLES });
  try {
    // 发送请求，保存服务端返回的数据
    const response = await http();
    // console.log("response", response);
    return dispatch({
      type: types.REQUEST_ARTICLES_SUCCESS,
      payload: response.articles,
    });
  } catch (e) {
    if (e instanceof AxiosError) {
      // 请求失败，获取错误信息
      return Promise.reject(
        dispatch({
          type: types.REQUEST_ARTICLES_ERROR,
          // 如果请求就没有发出去，那么就没有response
          error: e.response?.data?.errors,
        })
      );
    }
  }
};
// 更新本地文章
export const updateArticleCreator = (article) => ({
  type: types.UPDATE_ARTICLE,
  payload: article,
});
