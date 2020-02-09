import React from "react";

import styles from './Button.module.css';

const Button = (props) => {
    let classes = [styles.Button, styles[props.type]];

    if (props.disabled) {
        classes.push(styles.Disabled);
    }

    return <button className={classes.join(' ')} onClick={props.clicked}
            disabled={props.disabled}>{props.children}</button>
};

export default Button;