import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MealList from "../components/MealList";

// import { MEALS } from "../data/dummy-data";

// const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')

const FavoritesScreen = ({ navigation }) => {
  // const allMeals = useSelector(state => state.meals.favoriteMeals)
  const favMeals = useSelector(state => state.meals.favoriteMeals)
  // console.log(favMeals)
  // const favMeals = allMeals.filter(meal => favList.includes(meal.id))
  return <MealList listData={favMeals} navigation={navigation} />
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
