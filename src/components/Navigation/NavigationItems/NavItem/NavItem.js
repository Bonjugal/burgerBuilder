import React from "react";

import {NavLink} from 'react-router-dom';
import styles from './NavItem.module.css';

const NavItem = (props) => (
    <li className={styles.NavItem}>
        {/*<a href={props.link} className={props.active ? styles.active : null}>{props.children}</a>*/}
         <NavLink
             to={props.link}
             exact={props.exact}
             activeClassName={styles.active}>
             {props.children}
         </NavLink>
    </li>
);

export default NavItem;