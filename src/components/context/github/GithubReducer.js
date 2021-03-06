const githubReducer = (state, action) => {
    switch(action.type) {
        case 'GET_USERS':
            return {
                ...state,
                userResult: action.payload,
                loading: false,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'CLEAR_USERS':
            return {
                ...state,
                userResult: action.payload,
            };
        case 'GET_SINGLE_USER':
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case 'GET_USER_REPOS':
            return {
                ...state,
                userRepos: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default githubReducer;