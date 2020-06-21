import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './redux/root-reducer';

export const middlewares = process.env.NODE_ENV==="production"? [ReduxThunk] : [ReduxThunk, logger];

//create a store with the middleware
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(rootReducer);
export default store;
