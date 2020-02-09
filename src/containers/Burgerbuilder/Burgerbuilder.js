import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControl from "../../components/Burger/BuildControl/BuildControl";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axiosOrder from "../../axiosOrder";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from './../../store/actions/index';

class Burgerbuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmed: false,
            loading: false,
            error: false
        }; }

    purchaseCancel = () => {
        this.setState({confirmed:false});
    };

    purchaseContinue = () => {
        //console.log(this.props);

        /*this.props.history.push({
            pathname:'/checkout',
            state: {
                ingredients: this.state.ingredients,
                totalPrice: this.state.totalPrice
            }
        });
        ---- approach 2 ---- queryParams
        let queryArray = [];
        for (let key in this.props.ings) {
            queryArray.push(encodeURI(key) + '=' + encodeURI(this.props.ings[key]));
        }
        queryArray.push('price='+this.props.price);
        let query = queryArray.join('&');
*/
        this.props.initPurchase();
        this.props.history.push({
            pathname:'/checkout'
            //search: '?' + query
        });
    };

    loginClickHandler = () => {
        this.props.redirectPath('/checkout');
        this.props.history.push('/login');
    };

    componentDidMount() {
        console.log(this.props);
        this.props.initIngredients();
    };

    render() {
        const disabled = {...this.props.ings};
        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Unable to get Ingredients!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (<Aux>
                <Burger ingredientList={this.props.ings} />
                <BuildControl ingredientList={this.props.ings}
                              decrease={this.props.deleter}
                              increase={this.props.adder}
                              disabled={disabled}
                              total={this.props.price}
                              didConfirm={() => this.setState({confirmed:true})}
                              auth={this.props.authenticated}
                              clicked={this.loginClickHandler}/>
            </Aux>);
            orderSummary = <OrderSummary
                order={this.props.ings}
                total={this.props.price}
                cancel={this.purchaseCancel}
                continue={this.purchaseContinue}
                show={this.state.confirmed} />;
        }
        return (
            <Aux>
                <Modal show={this.state.confirmed} closed={this.purchaseCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
  return {
      ings: state.brgr.ingredients,
      price: state.brgr.totalPrice,
      error: state.brgr.error,
      authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
    return {
        adder: (ingredientType) => dispatch(actionCreators.increment(ingredientType)),
        deleter : (ingredientType) => dispatch(actionCreators.decrement(ingredientType)),
        initIngredients: () => dispatch(actionCreators.initIngredients()),
        initPurchase: () => dispatch(actionCreators.initPurchase()),
        redirectPath: (path) => dispatch(actionCreators.redirectPath(path))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Burgerbuilder,axiosOrder));