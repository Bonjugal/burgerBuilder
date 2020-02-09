import React from "react";

import styles from './NavigationItems.module.css';
import NavItem from "./NavItem/NavItem";

const NavigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavItem link="/" exact>Home</NavItem> {/*exact is property here, not property of a router component*/}
            {props.auth ? <NavItem link="/orders">My Orders</NavItem> : null}
            {props.auth ? <NavItem link="/logout">Logout</NavItem> : <NavItem link="/login">Login/Signup</NavItem>}
        </ul>
    );

};


export default NavigationItems;