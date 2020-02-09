import React, {useEffect, useState} from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent,axios) => {
    return props => {
        const [state, setState] = useState({
            error: null,
        });

        const requestInterceptor = axios.interceptors.request.use(request => {
            setState({error: null});
            return request;
        });

        const responseInterceptor = axios.interceptors.response.use(res => res, error => {
            setState({error: error});
            return Promise.reject(error);
        });

        useEffect(()=> {
           return ()=> {
               axios.interceptors.request.eject(requestInterceptor);
               axios.interceptors.response.eject(responseInterceptor);
           };
        });

        const errorCancel = () => {
            setState({error: null});
        };

        return (
            <Aux>
                <WrappedComponent {...props} />
                <Modal show={state.error} closed={errorCancel}>
                    {state.error ? state.error.message : null}
                </Modal>
            </Aux>
            );
    }
};

export default withErrorHandler;