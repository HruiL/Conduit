import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
const middles = [thunk];
const enhanders =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(...middles)
    : composeWithDevTools(applyMiddleware(...middles));
export const store = createStore(rootReducer, enhanders);
