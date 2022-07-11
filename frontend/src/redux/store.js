import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import appReducer from './reducers/appReducer';
import { authReducer } from './reducers/authReducer';
import { postReducer } from './reducers/postReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    account: accountReducer,
    post: postReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))