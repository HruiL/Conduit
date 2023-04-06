import * as types from "../types/tag.type";
const initialState = {
  tags: {
    result: [],
    status: "idle",
    error: null,
  },
  activeTagName: "",
};
export function tagReducer(state = initialState, action) {
  switch (action.type) {
    // 请求tags
    case types.REQUEST_TAGS:
      return { ...state, tags: { result: [], status: "pending", error: null } };
    // 请求tags成功
    case types.REQUEST_TAGS_SUCCESS:
      return {
        ...state,
        tags: { result: action.payload, status: "success", error: null },
      };
    // tags请求失败
    case types.REQUEST_TAGS_ERROR:
      return {
        ...state,
        tags: { result: [], status: "error", error: action.error },
      };
    // 设置高亮tag
    case types.SETUP_ACTIVE_TAG_NAME:
      return { ...state, activeTagName: action.payload };
    default:
      return state;
  }
}
