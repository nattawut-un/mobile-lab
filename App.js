import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, TextInput, Button, FlatList, Alert, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import firebase from './db/firebase'

import IT_Logo from './assets/IT_Logo.png'

const Stack = createNativeStackNavigator()
const studentCollection = firebase.firestore().collection('students')

function AddScreen({ navigation }) {
  const [ id, setId ] = useState('')
  const [ name, setName ] = useState('')
  const [ gpa, setGpa ] = useState('')

  const addStudent = () => {
    if (id == '' || name == '' || gpa == '' || isNaN(gpa))
      return console.log('Invalid input types/any input box is blank.')

    studentCollection
      .add({ id, name, gpa: parseFloat(gpa) })
      .then(res => {
        setId('')
        setName('')
        setGpa('')
        // Alert.alert('Success', 'New student is added.')
        navigation.navigate('View')
      })
      .catch(err => console.log(err))
  }
  const toView = () => navigation.navigate('View')

  return (
    <View style={styles.container}>
      <Image source={IT_Logo} style={styles.image} />
      <View style={styles.menu}>
        <Text variant="labelSmall" style={{ width: '100%' }}>
          Student ID
        </Text>
        <TextInput
          placeholder="Student ID"
          value={id}
          onChangeText={setId}
          style={{ ...styles.item, ...styles.textInput }}
        />
        <Text variant="labelSmall" style={{ width: '100%' }}>
          Student Name
        </Text>
        <TextInput
          placeholder="Student Name"
          value={name}
          onChangeText={setName}
          style={{ ...styles.item, ...styles.textInput }}
        />
        <Text variant="labelSmall" style={{ width: '100%' }}>
          GPA
        </Text>
        <TextInput
          placeholder="GPA"
          value={gpa}
          onChangeText={setGpa}
          style={{ ...styles.item, ...styles.textInput }}
        />
        <View style={{ ...styles.item, marginTop: 32 }}>
          <Button title="Add Student" onPress={addStudent} />
        </View>
        <View style={{ ...styles.item }}>
          <Button title="View Student" onPress={toView} />
        </View>
      </View>
    </View>
  )
}

function ViewScreen({ navigation }) {
  const [ students, setStudents ] = useState([])

  const getCollection = (querySnapshot) => {
    console.log('Fetching students data...')
    const data = []
    querySnapshot.forEach(res => {
      const { id, name, gpa } = res.data()
      data.push({ key: res.id, id, name, gpa })
    })
    setStudents(data)
  }
  const toStudentInfoPage = key => navigation.navigate('Info', { key })
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => toStudentInfoPage(item.key)}>
        <Text>id: {item.id}</Text>
        <Text variant="titleLarge">{item.name}</Text>
        <Text variant="labelLarge">GPA: {item.gpa}</Text>
      </TouchableOpacity>
    )
  }

  useEffect(() => studentCollection.onSnapshot(getCollection), [])

  return (
    <View style={{ paddingTop: 8, backgroundColor: 'white', height: '100%' }}>
      <FlatList renderItem={renderItem} data={students} />
    </View>
  )
}

function InfoScreen({ navigation, route }) {
  const studentInfo = studentCollection.doc(route.params.key)

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [gpa, setGpa] = useState('')

  const getStudent = () => {
    studentInfo.get().then(res => {
      console.log('Fetching data (' + route.params.key + ')')
      const data = res.data()
      setId(data.id)
      setName(data.name)
      setGpa(data.gpa + '')
    })
  }
  const updateStudent = () => {
    if (id == '' || name == '' || gpa == '' || isNaN(gpa))
      return console.log('Invalid input types/any input box is blank.')

    studentInfo.set({ id, name, gpa: parseFloat(gpa) }).then(res => {
      // Alert.alert('Success', 'Student has been updated.')
      console.log('Student updated (' + route.params.key + ')')
      navigation.goBack()
    })
  }
  const deleteStudent = () => {
    studentInfo.delete().then(res => {
      // Alert.alert('Success', 'Student has been deleted.')
      console.log('Student deleted (' + route.params.key + ')')
      navigation.goBack()
    })
  }

  useEffect(() => getStudent(), [])

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Text variant="labelSmall" style={{ width: '100%' }}>
          Key
        </Text>
        <TextInput
          placeholder="Key"
          value={route.params.key}
          editable={false}
          style={{ ...styles.item, ...styles.textInput }}
        />
        <Text variant="labelSmall" style={{ width: '100%' }}>
          Student ID
        </Text>
        <TextInput
          placeholder="Student ID"
          value={id}
          onChangeText={setId}
          style={{ ...styles.item, ...styles.textInput }}
        />
        <Text variant="labelSmall" style={{ width: '100%' }}>
          Student Name
        </Text>
        <TextInput
          placeholder="Student Name"
          value={name}
          onChangeText={setName}
          style={{ ...styles.item, ...styles.textInput }}
        />
        <Text variant="labelSmall" style={{ width: '100%' }}>
          GPA
        </Text>
        <TextInput
          placeholder="GPA"
          value={gpa}
          onChangeText={setGpa}
          style={{ ...styles.item, ...styles.textInput }}
        />
        <View style={{ ...styles.item, marginTop: 32 }}>
          <Button title="Update Student Info" onPress={updateStudent} />
        </View>
        <View style={{ ...styles.item }}>
          <Button title="Delete Student" onPress={deleteStudent} color="red" />
        </View>
      </View>
    </View>
  )
}

function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Add"
      screenOptions={{
        headerStyle: { backgroundColor: '#0085e6' },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="Add"
        component={AddScreen}
        options={{ headerTitle: 'Add Student' }}
      />
      <Stack.Screen
        name="View"
        component={ViewScreen}
        options={{ headerTitle: 'Student List' }}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={{ headerTitle: 'Student Info' }}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
      <StatusBar style="light" />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 32
  },
  image: {
    objectFit: 'contain',
    height: 120,
    margin: 16,
  },
  menu: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
  },
  item: {
    width: '100%',
    marginVertical: 4,
  },
  textInput: {
    backgroundColor: 'hsl(0, 0%, 95%)',
    // borderBottomColor: 'hsl(0, 0%, 50%)',
    // borderBottomWidth: 1,
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  card: {
    backgroundColor: 'hsl(0, 0%, 95%)',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16
  },
})
