import React, {useEffect} from "react";

import styles from './Modal.module.css';
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const Modal = (props) => {
    useEffect(()=>{
        console.log('Modal did update');
    },[props.show]);

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div
                className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? 1 : 0
                }}>
                {props.children}
            </div>
        </Aux>
    );
};

export default Modal;