import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers'; // Якщо ваш файл називається reducers.js

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;