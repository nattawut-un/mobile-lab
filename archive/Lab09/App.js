import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import mealsReducer from "./store/reducers/mealsReducer";

import MainNavigator from './navigation/MealNavigator'

const rootReducer = combineReducers({
  meals: mealsReducer
})
const store = createStore(rootReducer)

export default function App() {
  return <Provider store={store}><MainNavigator /></Provider>
}
