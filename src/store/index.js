import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducer from "./reducer";

// 创建store,配置中间件
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;