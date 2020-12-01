import React from 'react';
import './MealLabel.css'
export default function MealLabel() {
  // const classes = useStyles();
  // const [meal, setMeal] = React.useState('');

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setMeal(event.target.value as string);


  return (
    <div className="dropdown">
      <button className="dropbtn">Meal Label &#8681;</button>
      <div className="dropdown-content">
        <p>Breakfast</p>
        <p>Lunch</p>
        <p>Dinner</p>
        <p>Snack</p>
      </div>
    </div>
  );
};