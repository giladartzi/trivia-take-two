import * as actions from '../actions/availability';

let reducer = (state = { pending: false, availableUsers: [] }, action) => {
    switch (action.type) {
        case actions.AVAILABILITY_REQUEST:
            return Object.assign({}, state, {
                pending: true,
                state: null,
                availableUsers: [],
                error: null
            });
        case actions.AVAILABILITY_SUCCESS:
            return Object.assign({}, state, {
                pending: false,
                state: action.payload.state,
                availableUsers: action.payload.availableUsers,
                error: null
            });
        case actions.AVAILABILITY_FAILURE:
            return Object.assign({}, state, {
                pending: false,
                state: null,
                availableUsers: [],
                error: action.error.message
            });
        case actions.AVAILABLE_USER:
            var exists = state.availableUsers.filter((user) => user.id === action.payload.user.id).length > 0;

            if (!exists) {
                return Object.assign({}, state, {
                    availableUsers: [...state.availableUsers, action.payload.user]
                });
            }
            else {
                return state;
            }

        default:
            return state;
    }
};

export default reducer;