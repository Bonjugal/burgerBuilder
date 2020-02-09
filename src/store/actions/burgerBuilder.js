import * as actionTypes from './actionTypes';
import axiosOrder from "../../axiosOrder";

export const increment = (ingredientType) => {
    return {
        type: actionTypes.INCREMENT,
        ingredientType: ingredientType
    }
};

export const decrement = (ingredientType) => {
    return {
        type: actionTypes.DECREMENT,
        ingredientType: ingredientType
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const setError = () => {
    return {
        type: actionTypes.SET_ERROR,
    }
};

export const initIngredients = () => {
  return dispatch => {
       axiosOrder.get('/ingredients.json')
            .then(response => {
                console.log(response.data);
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(setError());
            })
  };
};