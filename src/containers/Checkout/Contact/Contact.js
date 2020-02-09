import React, { Component } from "react";
import {connect} from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import styles from './Contact.module.css';
import axiosOrder from "../../../axiosOrder";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from './../../../store/actions/index';
import {updatedObject, checkValidation} from './../../../shared/utility';

class Contact extends Component {
    initializer = (elementType, type, placeholder, value, min, max,isEmail,isNumeric) => {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value,
            validation: {
                required: true,
                minLength: min,
                maxLength: max,
                isEmail: isEmail,
                isNumeric: isNumeric
            },
            valid: false,
            touched: false
        };
    };

    state = {
        orderForm: {
            name: this.initializer('input','text','Enter your name','',3,20),
            street: this.initializer('input','text','Enter your street name','',3,200),
            pincode: this.initializer('input','number','Enter your pincode','',6,6,false,true),
            country: this.initializer('input','text','Enter your country','',3,20),
            email: this.initializer('input','email','Enter your email','',3,40,true),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'fastest',
            }
        },
        isFormValid: false
    };

    placeOrderHandler = (event) => {
        event.preventDefault();

        let customer = {};
        for (let key in this.state.orderForm) {
            customer[key] = this.state.orderForm[key].value;
        }
        const data = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            customer: customer,
            userId: this.props.userId
          };
        console.log(data);
        this.props.createOrder(data, this.props.token);
    };

    inputChangeHandler = (event, key) => {
        const newElement = updatedObject(this.state.orderForm[key],{
            value: event.target.value,
            touched: true,
            valid: checkValidation(event.target.value, this.state.orderForm[key].validation)
        });
        const newOrderForm = updatedObject(this.state.orderForm,{
            [key]: newElement
        });

        let isFormValid = true;
        for (let key in newOrderForm) {
            if (newOrderForm[key].validation) {
                isFormValid *= newOrderForm[key].valid;
            }
        }
        this.setState({orderForm: newOrderForm,isFormValid:isFormValid});
    };


    render() {
        const inputList  = Object.keys(this.state.orderForm)
                        .map(key => {
                            return <Input
                                key={key}
                                label={key}
                                elementType={this.state.orderForm[key].elementType}
                                elementConfig={this.state.orderForm[key].elementConfig}
                                value={this.state.orderForm[key].value}
                                changed={(event)=>{this.inputChangeHandler(event,key)}}
                                valid={this.state.orderForm[key].valid}
                                shouldValidate={this.state.orderForm[key].validation}
                                touched={this.state.orderForm[key].touched}/>;
                        });

        let form = (
            <form onSubmit={this.placeOrderHandler}>
                {inputList}
                <Button type="Success" disabled={!this.state.isFormValid}>Place Order</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.Contact}>
                <h4>Enter your contact details:</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.brgr.ingredients,
        price: state.brgr.totalPrice,
        loading: state.ordr.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createOrder: (order,token) => dispatch(actionCreators.createOrderAsync(order,token))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Contact,axiosOrder));