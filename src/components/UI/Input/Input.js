import React from 'react';

import styles from './Input.module.css';

const Input = (props) => {
    let inputVar = null;
    const inputClasses = [styles.InputElement];
    let validationError = null;
    if(!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
        validationError = <label className={styles.Label} style={{color:'red'}}>Please enter a valid '{props.label}'</label>
    }

    switch (props.elementType) {
        case ('input'):
            inputVar = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textArea'):
            inputVar = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            inputVar = <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(val=>{
                    return <option key={val.value} value={val.value}>{val.displayValue}</option>
                })}
            </select>;
            break;
        default:
            inputVar = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{validationError ? validationError : props.label}</label>
            {inputVar}
        </div>
    );
};



export default Input;