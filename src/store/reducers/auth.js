import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    token: null,
    userId: null,
    redirectPath: '/'
};

const authReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return updatedObject(state,{loading: true, error: null});
        case actionTypes.AUTH_SUCCESS: return updatedObject(state,{token: action.token, userId: action.userId, loading: false, error: null});
        case actionTypes.AUTH_FAIL: return updatedObject(state, {loading: false, error: action.error});
        case actionTypes.LOGOUT: return updatedObject(state, {token: null, userId: null});
        case actionTypes.REDIRECT_PATH: return updatedObject(state, {redirectPath: action.path});
        default: return state;
    }
};

export default authReducer;