import ReactDom from "react-dom/client";
import App from "@src/App";
import { Provider } from "react-redux";
import { store } from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDom.createRoot(document.getElementById("root"));
// 调用了persistStore之后，就可以让store中的状态持久化到本地
const persistor = persistStore(store);
root.render(
  <Provider store={store}>
    {/* PersistGate 组件的作用是延迟组件加载，当下次访问应用时，直到当本地的数据全部加载到redux store中*/}
    <PersistGate persistor={persistor}>
      <App />
      <ToastContainer />
    </PersistGate>
  </Provider>
);
