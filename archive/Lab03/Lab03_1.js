import { StyleSheet, Text, View, TextInput, Button, FlatList, SafeAreaView } from "react-native";
import { useState } from "react";

export default function Lab03_1() {
  const [text, setText] = useState('')
  const [notes, setNotes] = useState([])

  function addNote() {
    if (!(text.length)) {
      console.log('No string given.')
      return
    }

    setNotes([...notes, text])
    setText('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.header}>
          สมุดบันทึก
        </Text>
        <TextInput
          placeholder="เพิ่มข้อความที่นี่"
          style={styles.textInput}
          value={text}
          onChangeText={setText}
        />
        <Button
          title="บันทึก"
          onPress={() => addNote()}
        />
      </View>

      <FlatList
        style={styles.list}
        data={notes}
        keyExtractor={item => Math.random()}
        renderItem={({item}) => {
          return (
            <View style={styles.listItem}>
              <Text style={styles.listText}>{item}</Text>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(0, 0%, 97%)',
    flexDirection: 'column',
    flex: 1
  },
  toolbar: {
    marginTop: 12,
    padding: 32,
    // borderBottomWidth: 2
    // flex: 0
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16
  },
  textInput: {
    borderWidth: 2,
    height: 40,
    marginVertical: 8,
    paddingHorizontal: 8
  },
  list: {
    paddingHorizontal: 32,
    // flex: 3
  },
  listItem: {
    paddingBottom: 8,
    backgroundColor: '#eee',
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  listText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  }
})
