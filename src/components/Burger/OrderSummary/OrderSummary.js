import React, {useEffect} from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
    const order = Object.keys(props.order).map((el) => {
        return <li key={el}><span style={{textTransform:'capitalize'}}>{el}</span> : {props.order[el]}</li>
    });

    useEffect(()=>{
        console.log('Order Summary did update');
    },[props.show]);

    return (
    <Aux>
        <h3>Your Order details</h3>
        <ul>{order}</ul>
        <p>Your Total is: <strong>${props.total.toFixed(2)}</strong></p>
        <p>Continue to Checkout</p>
        <Button type="Danger" clicked={props.cancel}>Cancel</Button>
        <Button type="Success" clicked={props.continue}>Continue</Button>
    </Aux>
);

};

export default OrderSummary;