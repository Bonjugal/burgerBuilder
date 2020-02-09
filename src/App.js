import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import Layout from "./containers/Layout/Layout";
import Burgerbuilder from "./containers/Burgerbuilder/Burgerbuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from './store/actions/index';

class App extends Component {

    componentWillMount() {
        this.props.checkAuth();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/login" component={Auth} />
                <Route path="/" exact component={Burgerbuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if(this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/login" component={Auth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={Burgerbuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }
      return (
          <div>
              <Layout>
                  {routes}
              </Layout>
          </div>);
  }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuth: () => dispatch(actionCreators.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
