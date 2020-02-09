import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../../shared/utility';

const initialState = {
    loading: false,
    orders: [],
    purchased: false
};

const orderReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.GET_ORDER: return updatedObject(state,{orders:action.orders,loading: false});
        case actionTypes.GET_ORDER_FAIL: return updatedObject(state,{loading: false});
        case actionTypes.SET_LOADING: return updatedObject(state,{loading: true});
        case actionTypes.CREATE_ORDER:
            const newOrder = updatedObject(action.order,{id:action.id});
            const newOrders = updatedObject(state.orders,newOrder);
            return updatedObject(state,{orders: newOrders, loading: false, purchased: true});
        case actionTypes.CREATE_ORDER_FAIL: return updatedObject(state, {loading: false});
        case actionTypes.INIT_PURCHASE: return updatedObject(state, {purchased: false});
        default: return state;
    }
};

export default orderReducer;