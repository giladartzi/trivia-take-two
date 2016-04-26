import * as rest from '../utils/rest';

export const AVAILABILITY_REQUEST = 'AVAILABILITY_REQUEST';
export const AVAILABILITY_SUCCESS = 'AVAILABILITY_SUCCESS';
export const AVAILABILITY_FAILURE = 'AVAILABILITY_FAILURE';
export const AVAILABLE_USER = 'AVAILABLE_USER';

let availabilityRequest = () => {
    return {
        type: AVAILABILITY_REQUEST
    };
};

let availabilitySuccess = (payload) => {
    return {
        type: AVAILABILITY_SUCCESS,
        payload
    };
};

let availabilityFailure = (error) => {
    return {
        type: AVAILABILITY_FAILURE,
        error
    };
};

export function availability() {
    return (dispatch) => {
        dispatch(availabilityRequest());

        rest.post('/availability')
            .then(json => dispatch(availabilitySuccess(json)))
            .catch(error => dispatch(availabilityFailure(error)));
    }
}