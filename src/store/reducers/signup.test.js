import reducer from './signup';
import * as actionTypes from '../actions/actionTypes';

describe('signup reducer', () => {
    const initialState = {
        shouldRedirect: false,
        timestamp: null,
        message: null,
        loading: false
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should redirect if signup is successful', () => {
        expect(reducer(initialState, {
            type: actionTypes.SIGNUP_SUCCESS
        })).toEqual({
            shouldRedirect: true,
            timestamp: null,
            message: null,
            loading: false
        });
    });
});