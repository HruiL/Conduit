import { AxiosError } from "axios";
import * as types from "../types/comment.type";
// 获取评论列表
export const requestCommentsCreator = (http) => async (dispatch) => {
  // 更改文章列表的请求状态为pending
  dispatch({ type: types.REQUEST_COMMENTS });
  // 捕获请求错误
  try {
    // 发送获取文章列表的请求
    const res = await http();
    // 更改文章列表的请求状态为成功，并保存服务端返回的数据
    return dispatch({
      type: types.REQUEST_COMMENTS_SUCCESS,
      payload: res.comments,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return Promise.reject(
        // 更改文章列表的请求状态为失败，并保存失败信息
        dispatch({
          type: types.REQUEST_COMMENTS_ERROR,
          error: error.response?.data?.errors,
        })
      );
    } else {
      // 如果是其他类型的错误信息，则输出
      console.log(error);
    }
  }
};
// 保存发表的评论
export const saveCommentCreator = (comment) => ({
  type: types.SAVE_COMMENT,
  payload: comment,
});
// 删除本地评论
export const delCommentCreator = (id) => ({
  type: types.DELETE_COMMENT,
  payload: id,
});
