import React from "react";

import styles from './Toolbar.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div className={styles.Menu} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <Logo height="90%"/>
        <nav>
            <NavigationItems auth={props.auth}/>
        </nav>
    </header>
);

export default Toolbar;

//703b09