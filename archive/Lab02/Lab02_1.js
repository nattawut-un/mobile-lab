import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';

import IT_Logo from '../assets/images/IT_Logo.png';

export default function Lab02_1() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image source={IT_Logo} style={styles.image} />
        <Text style={styles.header}>คณะเทคโนโลยีสารสนเทศ</Text>
        <Text style={styles.content}>สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</Text>
      </View>
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <Button
            onPress={() => { Alert.alert('Programs'); }}
            title="Programs"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => { Alert.alert('About Us'); }}
            title="About Us"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {
    fontSize: 16,
    textAlign: 'center'
  },
  image: {
    width: 150,
    height: 150,
    objectFit: 'contain'
  },
  buttonGroup: {
    padding: 16,
    width: '100%',
    alignItems: 'stretch'
  },
  button: {
    marginVertical: 4
  }
});
