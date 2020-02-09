export const updatedObject = (initialObject,updatedValues) => {
    return {
        ...initialObject,
        ...updatedValues
    }
};

export const checkValidation = (value, rules) => {
    let isValid = true;
    if (!rules) { return true; }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength && rules.maxLength) {
        isValid = value.length >= rules.minLength && value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
};