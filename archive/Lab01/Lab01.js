import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useState } from 'react';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

export default function Lab01() {
  var [count, setCount] = useState(0);

  function increment(num = 1) {
    setCount(count + num);
    console.log(new Date().toLocaleTimeString() + ' count=' + count);
  }

  return (
    <View style={styles.container}>
      {/* <Image source={image} style={styles.image} /> */}
      <Text style={styles.header}>Hello, world!</Text>
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      <Text style={styles.content}>
        Dolor officia magna reprehenderit nulla culpa excepteur dolore consectetur reprehenderit tempor Lorem nulla nostrud. Id laboris cillum cupidatat ex mollit sit. Quis consequat do ullamco voluptate. Occaecat laboris do veniam qui reprehenderit. Voluptate et dolore incididunt velit quis mollit occaecat laborum consequat quis non ex.
      </Text>
      <Text style={styles.count}>
        count: {count}
      </Text>
      <StatusBar style="auto" />

      <View style={styles.buttonGroup}>
        <Button
          color="#ff5f5f"
          onPress={() => {
            increment(-10);
          }}
          title="-10"
        />
        <Button
          color="#ff5f5f"
          onPress={() => {
            increment(-5);
          }}
          title="-5"
        />
        <Button
          color="#ff5f5f"
          onPress={() => {
            increment(-1);
          }}
          title="-1"
        />
        <Button
          color="#ff5f5f"
          onPress={() => {
            setCount(0);
          }}
          title="SET 0"
        />
        <Button
          color="#ff5f5f"
          onPress={() => {
            increment();
          }}
          title="+1"
        />
        <Button
          color="#ff5f5f"
          onPress={() => {
            increment(5);
          }}
          title="+5"
        />
        <Button
          color="#ff5f5f"
          onPress={() => {
            increment(10);
          }}
          title="+10"
        />
      </View>

      <Text style={styles.subHeader}>Nattawut Un. 64070035</Text>
      <Text style={styles.text}>Mobile Device Programming 2023</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(200,100%,85%)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  count: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  text: {
    marginBottom: 5
  },
  content: {
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  image: {
    width: 500,
    height: 200,
    objectFit: 'cover'
  },
  buttonGroup: {
    flexDirection: 'row',
    paddingVertical: 10,
  }
});
