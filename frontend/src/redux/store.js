import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))