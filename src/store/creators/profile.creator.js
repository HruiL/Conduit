import * as types from "../types/profile.type";
// 更新本地作者信息
export const updateProfileCreator = (profile) => ({
  type: types.UPDATE_PROFILE,
  payload: profile,
});
