import { applyMiddleware, combineReducers, createStore, compose, AnyAction } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import accountReducer from './reducers/accountReducer'
import appReducer from './reducers/appReducer'
import authReducer from './reducers/authReducer'
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
})

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type TDispatch = ThunkDispatch<RootState, void, AnyAction>