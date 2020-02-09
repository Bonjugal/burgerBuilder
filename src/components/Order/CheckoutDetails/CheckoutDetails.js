import React from "react";

import styles from './CheckoutDetails.module.css';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";


const CheckoutDetails = (props) => {
        return (
            <div className={styles.CheckoutDetails}>
                <h1>Order Summary</h1>
                <div style={{width:'100%',margin:'auto'}}>
                    <Burger ingredientList={props.ingredients}/>
                </div>

                <div style={{display: props.show ? 'inline' : 'none'}}>
                    <Button
                        type="Danger"
                        clicked={props.goBack}> Go Back </Button>
                    <Button
                        type="Success"
                        clicked={props.continue}> Continue </Button>
                </div>

                <div style={{display: !props.show ? 'inline' : 'none'}}>
                    <p>Burger is not selected</p>
                    <a href="/">Go back</a>
                </div>

            </div>

        );
};

export default CheckoutDetails;