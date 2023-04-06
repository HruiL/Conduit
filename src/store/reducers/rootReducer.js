import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { articleDetailReducer } from "./articleDetailReducer";
import { articleReducer } from "./articleReducer";
import { metaReducer } from "./metaReducer";
import { tagReducer } from "./tagReducer";
import { userReducer } from "./userReducer";
export const rootReducer = combineReducers({
  metaReducer,
  userReducer: persistReducer({ key: "userReducer", storage }, userReducer),
  articleReducer,
  tagReducer,
  articleDetailReducer,
});
