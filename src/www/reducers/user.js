import * as actions from '../actions/user';

let reducer = (state = { pending: false }, action) => {
    switch (action.type) {
        case actions.REGISTER_REQUEST:
            return Object.assign({}, state, {
                pending: true,
                username: null,
                token: null,
                error: null
            });
        case actions.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                pending: false,
                username: action.payload.username,
                token: action.payload.token,
                error: null
            });
        case actions.REGISTER_FAILURE:
            return Object.assign({}, state, {
                pending: false,
                username: null,
                token: null,
                error: action.error.message
            });
        case actions.AUTHENTICATE_REQUEST:
            return Object.assign({}, state, {
                pending: true,
                username: null,
                token: null,
                error: null
            });
        case actions.AUTHENTICATE_SUCCESS:
            return Object.assign({}, state, {
                pending: false,
                username: action.payload.username,
                token: action.payload.token,
                error: null
            });
        case actions.AUTHENTICATE_FAILURE:
            return Object.assign({}, state, {
                pending: false,
                username: null,
                token: null,
                error: action.error.message
            });
        case actions.LOGOUT:
            return Object.assign({}, state, {
                pending: false,
                username: null,
                token: null,
                error: null
            });
        default:
            return state;
    }
};

export default reducer;