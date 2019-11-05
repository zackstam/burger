import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom';
import { updateObject } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
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
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        loading: false,
        isSignup: null
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity = (value, rules) =>  {
        let isValid = true;

        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;;
        }
        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup)
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }) 
        })

        this.setState({
            controls: updatedControls
        })
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => ({
            isSignup: !prevState.isSignup
        }))
    }

    render() {
        let form = null;
        const formElementArray = [];
        for (const key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        } 

        form = formElementArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ));
        if (this.props.loading) {
            form = <Spinner/>
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{ this.props.error.message }</p>
            )
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className="Auth">
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="success">SUBMIT</Button>
                </form>
                    <Button 
                        clicked={this.switchAuthModeHandler}
                        btnType="Danger">SWITCH TO {this.state.isSignup ? 'SINGIN' : 'SIGNUP'} </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirect
});

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
})


 export default connect(mapStateToProps, mapDispatchToProps)(Auth);