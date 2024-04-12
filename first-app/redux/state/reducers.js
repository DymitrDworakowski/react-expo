const userToken = (userToken = {token: ''},action) => {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return { token: action.token};
        default:
            return userToken;
    }
}