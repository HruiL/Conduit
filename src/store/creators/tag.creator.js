import { AxiosError } from "axios";
import * as types from "../types/tag.type";
// 请求tag标签的creator
export const requestTagsCreator = (http) => async (dispatch) => {
  // 将请求状态改为pending
  dispatch({ type: types.REQUEST_TAGS });
  // 发送请求捕获错误
  try {
    // 发送请求
    const res = await http();
    // 将请求状态改为成功，并保存服务器端返回的数据
    dispatch({ type: types.REQUEST_TAGS_SUCCESS, payload: res.tags });
  } catch (error) {
    if (error instanceof AxiosError) {
      // 如果请求失败，将请求状态改为失败态，并保存失败信息
      dispatch({
        type: types.REQUEST_TAGS_ERROR,
        error: error.response.data?.errors,
      });
    }
  }
};
// 设置高亮tag的creator
export const setupActiveTagNameCreator = (tagName) => ({
  type: types.SETUP_ACTIVE_TAG_NAME,
  payload: tagName,
});
