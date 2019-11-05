import React from 'react';
import { withRouter } from 'react-router-dom'
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
    console.log(props)
    let transformedIngredients = null;
    if (props.ingredients) {
        transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return  <BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])
      
    }
    console.log(transformedIngredients)
    if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Pleaste start adding ingredients</p>
    }

    return  (
        // <div></div>

        <div className="Burger">
            <BurgerIngredient type="bread-top"></BurgerIngredient>
                {transformedIngredients}          
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>            
        </div>
    )
}

export default withRouter(burger);