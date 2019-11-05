import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actionTypes'
class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }


    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }


    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (const param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({
            ingredients: ingredients
        })
    }

    onCheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() { 
        let summary = <Redirect to="/"/>
        if (this.props.ings) {
            const purchasedredirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedredirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        onCheckoutCancelled={this.onCheckoutCancelledHandler}
                        onCheckoutContinue={this.onCheckoutContinueHandler}/>
                    }
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
            )
            return summary;
        }
    }
}

const mapStateToProps = state => {
     return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

 
export default connect(mapStateToProps)(Checkout);