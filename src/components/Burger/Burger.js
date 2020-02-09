import React from "react";

import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import styles from './Burger.module.css'

const Burger = (props) => {

 /* let ingredients = [];
      for (let i=0; i < Object.keys(props.ingredientList).length; i++) {
          let type = Object.keys(props.ingredientList)[i];
          let quantity = props.ingredientList[Object.keys(props.ingredientList)[i]];
          for (let j=0; j < quantity; j++) {
              ingredients.push(<BurgerIngredient key={type+j} type={type}/>)
          }
    }*/

 let ingredients = Object.keys(props.ingredientList)
     .map(ig => {
         return [...Array(props.ingredientList[ig])].map((_,i)=>{
             return <BurgerIngredient key={ig + i} type={ig}/>
         })
         }
     ).reduce((arr,el)=>{
         return arr.concat(el);
     },[]);


 /*let ingredients = props.ingredientList.map((ig,index) => {
     return <BurgerIngredient key={ig + index} type={ig}/>
 });
 If you want to add
 */

return (
    <div className={styles.Burger}>
        <BurgerIngredient type="bread-top"/>
       {ingredients.length ? ingredients : "Please add ingredients"}
        <BurgerIngredient type="bread-bottom"/>
    </div>
);
};

export default Burger;