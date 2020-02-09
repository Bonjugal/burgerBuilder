import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from "../../components/Order/Order";
import axiosOrder from "../../axiosOrder";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from './../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.getOrders(this.props.token,this.props.userId);
    }

    render() {
        let  orders = <p style={{textAlign: 'center'}}>No Past Orders</p>;
        if (this.props.orders) {
            orders = Object.keys(this.props.orders)
            .map(order => {
                if (this.props.orders[order].ingredients) {
                    return <Order key={order} ingredients={this.props.orders[order].ingredients}
                                  price={+this.props.orders[order].totalPrice}/>;
                } else {
                    return <p>No Data Found</p>;
                }
        });
        }
        if (this.props.loading) {
            orders = <Spinner />;
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders : state.ordr.orders,
        loading: state.ordr.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token,userId) => dispatch(actionCreators.getOrderAsync(token,userId))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axiosOrder));