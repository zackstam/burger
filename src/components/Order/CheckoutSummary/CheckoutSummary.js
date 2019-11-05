import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    console.log(props.ingredients)
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well !</h1>
            <div style={{ width: '360px', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.onCheckoutCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.onCheckoutContinue}>Continue</Button>
        </div>
    );
}
 
export default checkoutSummary;