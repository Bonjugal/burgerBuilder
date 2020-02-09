import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from "../../hoc/Aux/Aux";
import styles from './Layout.module.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
      showSideDrawer: false
    };

    showToggler = () => {
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        } )
    };

    render() {

        return (
            <Aux>
                <Toolbar clicked={this.showToggler} auth={this.props.authenticated}/>
                <SideDrawer show={this.state.showSideDrawer} clicked={this.showToggler} auth={this.props.authenticated}/>
                <main className={styles.box}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);

