import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };

        // TODO: add the API endpoint here later
        axios.post(`link to API auth`, authData)
            .then(response => {
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
};
