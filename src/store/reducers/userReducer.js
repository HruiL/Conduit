import * as types from "../types/user.type";
const initialState = { user: {} };
export function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
