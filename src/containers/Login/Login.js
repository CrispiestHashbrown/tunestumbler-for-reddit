import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Login.css';
import * as actions from '../../store/actions/index';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Login extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                 },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({
            controls: updatedControls
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value);
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.timestamp && this.props.message) {
            errorMessage = (
                <Auxiliary>
                    <p>{this.props.timestamp}</p>
                    <p>{this.props.message}</p>
                </Auxiliary>
            );
        }

        return (
            <div className={classes.Login}>
                {/* TODO: add error styling */}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button buttonType="Successful">Log in</Button>
                </form>
           </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.signup.loading,
        timestamp: state.signup.timestamp,
        message: state.signup.message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);