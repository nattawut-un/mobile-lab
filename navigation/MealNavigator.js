import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/mealsAction";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FiltersScreen from '../screens/FiltersScreen'
import FavoritesScreen from '../screens/FavoritesScreen'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButton, HeaderButtons, Item } from "react-navigation-header-buttons";

const Meals = createNativeStackNavigator()
const Fav = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Filter = createNativeStackNavigator()
const Main = createDrawerNavigator()

const FavoriteButton = props => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color='white'
  />
)

function MealsNavigator() {
  const favIds = useSelector(state => state.meals.favoriteMeals).map(i => i.id)
  const dispatch = useDispatch()
  const toggleFavoriteHandler = mealId => dispatch(toggleFavorite(mealId))

  return (
    <Meals.Navigator
      initialRouteName="Categories"
      screenOptions={{
        ...styles.screen,
        animation: 'fade',
      }}
    >
      <Meals.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Meal Categories',
        }}
      />
      <Meals.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => ({
          title: route.params.categoryTitle,
        })}
      />
      <Meals.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => ({
          title: route.params.mealDetails.title,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={FavoriteButton}>
              <Item
                title="Tab_1"
                iconName={favIds.includes(route.params.mealDetails.id) ? 'ios-star' : 'ios-star-outline'}
                onPress={() =>
                  toggleFavoriteHandler(route.params.mealDetails.id)
                }
              />
            </HeaderButtons>
          ),
        })}
      />
    </Meals.Navigator>
  )
}

function FavNavigator() {
  const favIds = useSelector(state => state.meals.favoriteMeals).map(i => i.id)
  const dispatch = useDispatch()
  const toggleFavoriteHandler = mealId => dispatch(toggleFavorite(mealId))

  return (
    <Fav.Navigator
      initialRouteName="Fav"
      screenOptions={{
        ...styles.screen,
        title: 'Your Favorites',
      }}
    >
      <Fav.Screen name="Fav" component={FavoritesScreen} />
      <Fav.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => ({
          title: route.params.mealDetails.title,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={FavoriteButton}>
              <Item
                title="Tab_1"
                iconName={
                  favIds.includes(route.params.mealDetails.id)
                    ? 'ios-star'
                    : 'ios-star-outline'
                }
                onPress={() =>
                  toggleFavoriteHandler(route.params.mealDetails.id)
                }
              />
            </HeaderButtons>
          ),
        })}
      />
    </Fav.Navigator>
  )
}

function MealsFavTabNavigator() {
  const favs = useSelector(state => state.meals.favoriteMeals)

  return (
    <Tab.Navigator
      initialRouteName="Meals"
      safeAreaInsets={{ bottom: 12 }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4a148c',
      }}
    >
      <Tab.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-restaurant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-star" size={size} color={color} />
          ),
          tabBarBadge: favs.length ? favs.length : undefined
        }}
      />
    </Tab.Navigator>
  )
}

function FiltersNavigator() {
  return (
    <Filter.Navigator initialRouteName="Filters" screenOptions={styles.screen}>
      <Filter.Screen name="Filters" component={FiltersScreen} options={{
        title: 'Filter Meals'
      }} ></Filter.Screen>
    </Filter.Navigator>
  )
}

function MainNavigator() {
  return (
    <Main.Navigator
      initialRouteName="MealsFav"
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerActiveBackgroundColor: 'white',
        drawerActiveTintColor: '#4a148c',
        drawerInactiveBackgroundColor: '#834cc7',
        drawerInactiveTintColor: 'white',
        drawerStyle: {
          paddingTop: 48,
          backgroundColor: '#4a148c',
          width: 250,
        },
        swipeEdgeWidth: 727,
        overlayColor: '#000a',
      }}
    >
      <Main.Screen
        name="MealsFav"
        component={MealsFavTabNavigator}
        options={({ route }) => ({
          title: 'Meals',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="ios-restaurant" size={size} color={color} />
          ),
        })}
      />
      <Main.Screen
        name="FiltersNav"
        component={FiltersNavigator}
        options={({ route }) => ({
          title: 'Filters',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="filter" size={size} color={color} />
          ),
        })}
      />
    </Main.Navigator>
  )
}

// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      <MainNavigator />
      <StatusBar style='light' />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    headerStyle: { backgroundColor: '#4a148c' },
    headerTintColor: 'white',
  },
})
