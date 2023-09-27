import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealItem from '../components/MealItem'

const MealList = ({ listData, navigation }) => {
  const renderMealItem = itemData => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectMeal={() =>
          navigation.navigate('MealDetail', { mealDetails: itemData.item })
        }
      />
    )
  }

  return (
    <View style={styles.screen}>
      <FlatList
        style={{ width: '100%' }}
        data={listData}
        renderItem={renderMealItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
