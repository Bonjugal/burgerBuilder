import * as actionTypes from './actionTypes';
import axiosOrder from "../../axiosOrder";

//loading is shared by getting orders (orders) and posting orders (contact)
export const setLoading = () => {
    return {
        type: actionTypes.SET_LOADING
    }
};

export const createOrder = (id, order) => {
    return {
        type: actionTypes.CREATE_ORDER,
        id: id,
        order: order
    }
};

//posting the orders to the server

export const createOrderFail = (error) => {
    return {
        type: actionTypes.CREATE_ORDER_FAIL,
        error: error
    }
};

export const createOrderAsync = (order, token) => {
    return dispatch => {
        dispatch(setLoading());
        axiosOrder.post('/orders.json?auth='+token,order)
            .then(response => {
                dispatch(createOrder(response.data.name, order));
            })
            .catch(err => {
                console.log(err);
                dispatch(createOrderFail(err));
            })
    }
};

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    };
};

//Getting the orders in My Orders page

export const getOrder = (order) => {
    return {
        type: actionTypes.GET_ORDER,
        orders: order
    }
};

export const getOrderFail = (error) => {
    return {
        type: actionTypes.GET_ORDER_FAIL,
        error: error
    }
};

export const getOrderAsync = (token, userId) => {
    return dispatch => {
        dispatch(setLoading());
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axiosOrder.get('/orders.json'+queryParam)
            .then(response => {
                console.log(response.data);
                dispatch(getOrder(response.data));
            })
            .catch(err => {
                dispatch(getOrderFail(err));
            })
    };
};