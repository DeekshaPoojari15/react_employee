import { createStore, combineReducers, applyMiddleware } from 'redux'
import Reducers from './employee/Reducers'
import Reducer from './login/Reducer'
import thunk  from 'redux-thunk'
import logger from 'redux-logger'

const rootReducer=combineReducers({
    login:Reducer,
    employee:Reducers
})

const store = createStore(rootReducer, applyMiddleware(thunk,logger))

export default store;