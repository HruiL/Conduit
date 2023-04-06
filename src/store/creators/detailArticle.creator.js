import * as types from "../types/detailArticle.type";
// 请求文章详情
export const requestDetailArticleCreator = (http) => async (dispatch) => {
  dispatch({ type: types.REQUEST_ARTICLE_DETAIL });
  try {
    const response = await http();
    return dispatch({
      type: types.REQUEST_ARTICLE_DETAIL_SUCCESS,
      payload: response.article,
    });
  } catch (error) {
    return Promise.reject(
      dispatch({
        type: types.REQUEST_ARTICLE_DETAIL_ERROR,
        error: error.response?.data?.errors,
      })
    );
  }
};
// 删除本地文章详情
export const delDetailArticleCreator = () => ({
  type: types.DELETE_ARTICLE_DETAIL,
});
