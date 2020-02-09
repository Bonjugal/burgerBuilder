import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from './SideDrawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const SideDrawer = (props) => {
    return (
        <Aux>
        <Backdrop show={props.show} clicked={props.clicked}/>
        <div className={[styles.SideDrawer, props.show ? styles.Open : styles.Close].join(' ')} onClick={props.clicked}>
            <Logo height="10%"/>
            <div style={{marginBottom: '32px'}}></div>
            <nav><NavigationItems auth={props.auth}/></nav>
        </div>
        </Aux>

    );
};

export default SideDrawer;