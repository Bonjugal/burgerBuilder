import React from "react";

import styles from './control.module.css';

const Control = (props) => {

    return (
        <div className={styles.Control}>
            <div className={styles.Label}>{props.type}</div>
            <button className={styles.Less} onClick={props.decrease} disabled={props.disabled}>Less</button>{props.quantity}
            <button className={styles.More} onClick={props.increase}>More</button>
        </div>
    );
};

export default Control