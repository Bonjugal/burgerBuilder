import React from 'react';

import styles from './Order.module.css';

const Order = (props) => {
    let ingredients = Object.keys(props.ingredients)
        .map(ig=>
            (<span key={ig} style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}>{ig} : {props.ingredients[ig]} </span>
            ));

    //console.log(props.ingredients);
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredients} </p>
            <p>Price: <b>{props.price.toFixed(2)}</b></p>
        </div>
    );
}

export default Order;