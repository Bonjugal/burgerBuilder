import * as actionTypes from "./actionTypes";
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authenticate = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};

export const authenticateFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
      setTimeout(()=> {
          dispatch(logout());
      },expirationTime*1000);
  }
};

//for Auth.js
export const authenticateAsync = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            "email": email,
            "password": password,
            "returnSecureToken": true
        };
        const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCePMxiMQJR9G7CN4bZz8x0ccrgVYS3uHI';
        const signInURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCePMxiMQJR9G7CN4bZz8x0ccrgVYS3uHI';
        axios.post(isSignup ? signUpUrl : signInURL,data)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId',response.data.localId);

                console.log(response);
                dispatch(authenticate(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authenticateFail(err.response.data.error));
            })
    };
};

export const redirectPath = (path) => {
    return {
        type: actionTypes.REDIRECT_PATH,
        path: path
    }
};

//for App.js
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                const time = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(authenticate(token, userId));
                dispatch(checkAuthTimeout(time));
            } else {
                dispatch(logout());
            }

        }
    };
};