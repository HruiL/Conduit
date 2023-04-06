import * as types from "../types/user.type";
// 保存用户信息
export const saveUserCreator = (user) => ({
  type: types.SAVE_USER,
  payload: user,
});
