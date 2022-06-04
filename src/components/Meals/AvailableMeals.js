import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { SpinnerCircular } from 'spinners-react';
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99111,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpErrors, setHttpErrors] = useState(null);

  useEffect(() => {
    fetch('https://foods-a231a-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json();
      })
      .then(data => {
        let loadedMeals = [];
        for (let key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setHttpErrors(error.message);
      })
  }, [])

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <SpinnerCircular />
        {/* <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> */}
      </section>
    )
  }

  if (httpErrors) {
    return (
      <section className={classes.MealsError}>
        <p>{httpErrors}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;