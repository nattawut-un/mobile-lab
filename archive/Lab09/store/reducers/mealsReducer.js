import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/mealsAction";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
}

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const mealIndex = state.favoriteMeals.findIndex(item => item.id == action.mealId)
      if (mealIndex >= 0) {
        state.favoriteMeals.splice(mealIndex, 1)
      } else {
        state.favoriteMeals.push(
          state.meals.find(meal => meal.id == action.mealId)
        )
      }
      return JSON.parse(JSON.stringify(state))
    default:
      return state
  }
}

export default mealsReducer
