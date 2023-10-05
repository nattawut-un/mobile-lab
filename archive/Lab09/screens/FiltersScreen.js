import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

const FiltersScreen = (props) => {
  const [gluten, setGluten] = useState(false)
  const [lactose, setLactose] = useState(false)
  const [vegan, setVegan] = useState(false)
  const [vegetarian, setVegetarian] = useState(false)

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <View style={styles.filterContainer}>
        <Text>Gluten-free</Text>
        <Switch
          trackColor={{ true: '#ff6f00', false: 'lightgray' }}
          thumbColor={'#ff6f00'}
          value={gluten}
          onValueChange={setGluten}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text>Lactose-free</Text>
        <Switch
          trackColor={{ true: '#ff6f00', false: 'lightgray' }}
          thumbColor={'#ff6f00'}
          value={lactose}
          onValueChange={setLactose}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text>Vegan</Text>
        <Switch
          trackColor={{ true: '#ff6f00', false: 'lightgray' }}
          thumbColor={'#ff6f00'}
          value={vegan}
          onValueChange={setVegan}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text>Vegetarian</Text>
        <Switch
          trackColor={{ true: '#ff6f00', false: 'lightgray' }}
          thumbColor={'#ff6f00'}
          value={vegetarian}
          onValueChange={setVegetarian}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    margin: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FiltersScreen;
