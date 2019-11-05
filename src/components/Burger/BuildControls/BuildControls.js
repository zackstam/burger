import React from 'react';
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]
const buildControls = (props) => (
    <div className="BuildControls">
        <p>Current price : <strong>{props.price}</strong></p>
        {
            controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                type={ctrl.type}
                added={() => props.ingredientsAdded(ctrl.type)}
                removed={() => props.ingredientsRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}></BuildControl>
            ))
        }
        <button 
            onClick={props.ordered} 
            disabled={!props.purchasable} 
            className="OrderButton"> 
            { props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER' }
        </button>
    </div>
)

export default buildControls;