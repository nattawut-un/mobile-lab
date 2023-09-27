import React from "react";
import { View, Text, Button, StyleSheet, Image, FlatList, ScrollView, SectionList } from "react-native";
import { MEALS } from "../data/dummy-data";

const MealDetailScreen = ({ route, navigation }) => {
  // เขียนโค้ดเพิ่ม เพื่อดึงข้อมูลเกี่ยวกับเมนูอาหารที่ผู้ใช้เลือกเอาไว้
  const { mealDetails } = route.params
  // const mealDetails = MEALS.find(item => item.id === mealId)

  const renderList = itemData => <Text>{itemData.index + 1}) {itemData.item}</Text>
  const renderHeader = ({ section }) => <Text style={{ ...styles.title, fontSize: 18 }}>{section.title}</Text>

  return (
    <View style={styles.screen}>
      {/* <Text>The Meal Detail Screen!</Text> */}
      <Image
        source={{ uri: mealDetails.imageUrl }}
        style={styles.image}
      />
      <Text style={{ ...styles.title, fontSize: 24 }}>{mealDetails.title}</Text>
      <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
        <Text style={styles.bubble}>{mealDetails.duration}m</Text>
        <Text style={styles.bubble}>{mealDetails.affordability}</Text>
        <Text style={styles.bubble}>{mealDetails.complexity}</Text>
      </View>

      <SectionList
        style={{ paddingHorizontal: 16, width: '100%' }}
        sections={[
          { title: 'Ingredients', data: mealDetails.ingredients },
          { title: 'Steps', data: mealDetails.steps },
        ]}
        renderItem={renderList}
        renderSectionHeader={renderHeader}
        keyExtractor={item => 'item-' + item}
      />

      <View style={{ marginVertical: 16 }}>
        <Button
          title="Go Back to Categories"
          onPress={() => {
            navigation.navigate('Categories')
          }}
        />
        {/* <View style={{ margin: 4 }} />
        <Button
          title="Go Back to Favorites"
          onPress={() => {
            navigation.navigate('Fav')
          }}
        /> */}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 200,
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bubble: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#4a148c',
  },
})

export default MealDetailScreen;
