import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import reducer from "./reducers/index"
import logger from "./middlewares/logger"

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;