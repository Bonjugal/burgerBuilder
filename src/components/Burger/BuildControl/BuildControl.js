import React from "react";

import styles from './BuildControl.module.css';
import Control from "./Control/Control";

const BuildControl = (props) => {
   const listControl = Object.keys(props.ingredientList).map((ig,index) => {
        return <Control key={ig}
                        type={ig}
                        quantity={props.ingredientList[ig]}
                        decrease={()=>props.decrease(Object.keys(props.ingredientList)[index])}
                        increase={()=>props.increase(Object.keys(props.ingredientList)[index])}
                        disabled={props.disabled[ig]} />
    });

    let allDisabled = true;
    for (let key in props.disabled) {
        allDisabled *= props.disabled[key];
    }

    return (
        <div className={styles.BuildControl}>
            <b>Total Amount: ${props.total.toFixed(2)}</b>
            {listControl}
            <br />
            {props.auth
                ? <button className={styles.orderButton} disabled={allDisabled} onClick={props.didConfirm}>Checkout</button>
                : <button className={styles.orderButton} onClick={props.clicked}>Login to Continue</button>}
        </div>
    );
};

export default BuildControl;