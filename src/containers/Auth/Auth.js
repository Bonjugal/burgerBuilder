import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

import styles from './Auth.module.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actionCreators from './../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";
import {updatedObject, checkValidation} from "../../shared/utility";


class Auth extends Component {
    state = {
      controls: {
          email: {
              elementType: 'input',
              elementConfig: {
                  type: 'email',
                  placeholder: 'Enter your Email'
              },
              value: '',
              validation: {
                  required: true,
                  minLength: '3',
                  maxLength: '200',
                  isEmail: true
              },
              valid: false,
              touched: false
          },
          password: {
              elementType: 'input',
              elementConfig: {
                  type: 'password',
                  placeholder: 'Enter your Password'
              },
              value: '',
              validation: {
                  required: true,
                  minLength: '7',
                  maxLength: '40'
              },
              valid: false,
              touched: false
          }
      },
        isFormValid: false,
        isSignUp: true
    };

    inputChangeHandler = (event, key) => {
        //newOrderForm[key].value = event.target.value; Can't do this directly because objects inside objects are now referenced.
        const newElement = updatedObject(this.state.controls[key],{
            value: event.target.value,
            touched: true,
            valid: checkValidation(event.target.value, this.state.controls[key].validation)
        });

        const newControls = updatedObject(this.state.controls, {
            [key]: newElement
        });

        let isFormValid = true;
        for (let key in newControls) {
            if (newControls[key].validation) {
                isFormValid *= newControls[key].valid;
            }
        }
        this.setState({controls: newControls,isFormValid:isFormValid});
    };

    authenticationHandler = (event) => {
        event.preventDefault();
        let email = this.state.controls.email.value;
        let password = this.state.controls.password.value;
        let signUp = this.state.isSignUp;
        this.props.authenticate(email, password,signUp);
    };

    switchHandler = () => {
      this.setState(prevState => {
          return { isSignUp: !prevState.isSignUp } });
    };

    componentDidMount() {
        if (!this.props.building && this.props.redirectPath !== '/') {
            this.props.redirect('/');
        }
    }


    render() {
        let signOn  = Object.keys(this.state.controls)
            .map(key => {
                return <Input
                    key={key}
                    label={key}
                    elementType={this.state.controls[key].elementType}
                    elementConfig={this.state.controls[key].elementConfig}
                    value={this.state.controls[key].value}
                    changed={(event)=>{this.inputChangeHandler(event,key)}}
                    valid={this.state.controls[key].valid}
                    shouldValidate={this.state.controls[key].validation}
                    touched={this.state.controls[key].touched}/>;
            });

        let form = (
            <form onSubmit={this.authenticationHandler}>
                {signOn}
                <Button type="Success" disabled={!this.state.isFormValid}>{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p style={{color:'red'}}>{this.props.error.message}</p>
        }

         let page= <Redirect to={this.props.redirectPath}/>;

        if (!this.props.authenticated) {
            page = (
                <div className={styles.Auth}>
                    <h4>{this.state.isSignUp ? 'Please Sign Up' : 'Welcome Back! Please Sign in'}</h4>
                    {errorMessage}
                    {form}
                    <Button type="Danger" clicked={this.switchHandler}>{this.state.isSignUp ? 'Already a user? Sign In' : 'New User? Sign Up'}</Button>
                </div>
            );
        }

        return page
    }
};

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      authenticated: state.auth.token !== null,
      building: state.brgr.building,
      redirectPath: state.auth.redirectPath
  }
};

const mapDispatchToProps = dispatch => {
  return {
      authenticate: (email, password, isSignUp) => dispatch(actionCreators.authenticateAsync(email, password, isSignUp)),
      redirect: (path) => dispatch(actionCreators.redirectPath(path))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);