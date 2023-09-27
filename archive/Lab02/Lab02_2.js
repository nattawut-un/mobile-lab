import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

import IT_Logo from '../assets/images/IT_Logo.png';
import AIT from '../assets/images/course-bach-ait.jpg';
import BIT from '../assets/images/course-bach-bit.jpg';
import DSBA from '../assets/images/course-bach-dsba.jpg';
import IT from '../assets/images/course-bach-it.jpg';

const items = [
  {
    title: 'Information Technology',
    image: IT
  },
  {
    title: 'Data Science and Business Analytics',
    image: DSBA
  },
  {
    title: 'Business Information Technology (International Program)',
    image: BIT
  },
  {
    title: 'Artificial Intelligence Technology',
    image: AIT
  },
]

export default function Lab02_2() {
  return (
    <View style={styles.container}>

      <View style={styles.navbar}>
        <View style={styles.navbarLeft}>
          <Image source={IT_Logo} style={styles.image} />
        </View>
        <View style={styles.navbarRight}>
          <Text style={styles.navbarHeader}>
            Programs
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {items.map(i => (
          <TouchableOpacity key={i.id} style={styles.button}>
            <Image source={i.image} />
            <Text style={styles.buttonText}>{i.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 4,
    flexDirection: 'column'
  },
  content: {
    // flex: 4
  },
  image: {
    width: 50,
    height: 50,
    objectFit: 'contain'
  },
  navbar: {
    // flex: 1,
    width: '100%',
    height: 100,
    paddingTop: 32,
    paddingBottom: 18,
    paddingHorizontal: 18,
    backgroundColor: '#a2ceda',
    zIndex: 999,
    flexDirection: 'row'
  },
  navbarLeft: {
    flex: 1,
  },
  navbarRight: {
    flex: 4
  },
  navbarHeader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#151d7b',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 8,
    textAlign: 'center'
  }
});
