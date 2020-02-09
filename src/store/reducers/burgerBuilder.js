import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../../shared/utility';

const PRICE_LIST = {
    salad: 0.8,
    alootikki: 1.5,
    cheese: 1,
    meat: 1.4
};

const initialState = {
    ingredients: null,
    totalPrice: 4.99,
    error: false,
    building: false
};

const adder = (state,action) => {
    let incIngredients = {...state.ingredients};
    incIngredients[action.ingredientType]++;
    let updatedPrice = state.totalPrice + PRICE_LIST[action.ingredientType];
    return updatedObject(state,{ingredients: incIngredients, totalPrice: updatedPrice, building: true});
};

const deleter = (state,action) => {
    let decIngredients = {...state.ingredients};
    if (decIngredients[action.ingredientType] > 0 ) {
        decIngredients[action.ingredientType]--;
    }
    let updatedDecPrice = state.totalPrice - PRICE_LIST[action.ingredientType];
    return updatedObject(state,{ingredients: decIngredients, totalPrice: updatedDecPrice, building: true});
};

const setter = (state,action) => {
    return updatedObject(state,{
        ingredients: {
            salad: action.ingredients.salad,
            alootikki: action.ingredients.alootikki,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat },
        error: false,
        totalPrice:4.99,
        building: false
    });
};

const burgerBuilderReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT: return adder(state,action);
        case actionTypes.DECREMENT: return deleter(state,action);
        case actionTypes.SET_INGREDIENTS: return setter(state,action);
        case actionTypes.SET_ERROR: return updatedObject(state,{error: true});
        default: return state;
    }
};

export default burgerBuilderReducer;