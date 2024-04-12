import { combineReducers } from 'redux';

const userToken = (state = { token: '' }, action) => {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return { token: action.token };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    userToken,
    // Додайте інші редуктори тут, якщо потрібно
});

export default rootReducer;