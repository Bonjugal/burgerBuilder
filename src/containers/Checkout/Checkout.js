import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import CheckoutDetails from "../../components/Order/CheckoutDetails/CheckoutDetails";
import Contact from "./Contact/Contact";
import Aux from "../../hoc/Aux/Aux";

class Checkout extends Component{

    componentWillMount() {
        console.log('checkout.js',this.props);
        /*
        if (this.props.location.state) { this.setState({
            ingredients: this.props.location.state.ingredients,
            totalPrice: this.props.location.state.totalPrice
        }); }
         */
        /* ---Approach 2 ----
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        let ingredients = {};
        let totalPrice = 0;

        for (let param of params.entries()) {
            //Each entry will be like ['salad', '1']
            if (param[0]!=='price') {
                ingredients[param[0]] = +param[1];
            } else {
                totalPrice = param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: totalPrice});*/
    };

    goBackHandler = () => {
      this.props.history.goBack();
    };

    continueHandler = () => {
       this.props.history.replace('/checkout/contact');
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <Aux>
                    {purchasedRedirect}
                    <CheckoutDetails
                        ingredients={this.props.ings}
                        goBack={this.goBackHandler}
                        continue={this.continueHandler}
                        show/>
                        <Route
                            path={this.props.match.url + "/contact"}
                            component={Contact} />
                </Aux>);
        }
        return (
            <div>{summary}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.brgr.ingredients,
        purchased: state.ordr.purchased
    };
};

export default connect(mapStateToProps)(Checkout);

