import { applyMiddleware, combineReducers, createStore, compose, AnyAction } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import accountReducer from './reducers/accountReducer'
import appReducer from './reducers/appReducer'
import authReducer from './reducers/authReducer'
import chatReducer from './reducers/chatReducer'
import postReducer from './reducers/postReducer'

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    account: accountReducer,
    post: postReducer,
    chat: chatReducer
})

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type TDispatch = ThunkDispatch<RootState, void, AnyAction>